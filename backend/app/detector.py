import base64
import cv2
import mediapipe as mp
import numpy as np

from collections import deque

eye_history = deque(maxlen=8)

mp_face = mp.solutions.face_mesh

face_mesh = mp_face.FaceMesh(
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

LEFT_EYE = [33, 160, 158, 133, 153, 144]
RIGHT_EYE = [362, 385, 387, 263, 373, 380]
MOUTH = [61, 291, 13, 14]

EAR_THRESHOLD = 0.23
MAR_THRESHOLD = 0.40


def eye_aspect_ratio(eye):
    A = np.linalg.norm(np.array(eye[1]) - np.array(eye[5]))
    B = np.linalg.norm(np.array(eye[2]) - np.array(eye[4]))
    C = np.linalg.norm(np.array(eye[0]) - np.array(eye[3]))

    return (A + B) / (2.0 * C)


def get_points(face, idx, w, h):
    return [
        (
            int(face.landmark[i].x * w),
            int(face.landmark[i].y * h)
        )
        for i in idx
    ]


def mouth_aspect_ratio(mouth):
    vertical = np.linalg.norm(
        np.array(mouth[2]) - np.array(mouth[3])
    )

    horizontal = np.linalg.norm(
        np.array(mouth[0]) - np.array(mouth[1])
    )

    if horizontal < 1:
        return 0

    return vertical / horizontal


def head_sleep_check(face):
    nose = face.landmark[1].y

    left = face.landmark[234].y
    right = face.landmark[454].y

    if abs(left - right) > 0.08:
        return True

    if nose > 0.75:
        return True

    return False


def detect_drowsiness(image_data: str):

    try:

        if "," in image_data:
            image_data = image_data.split(",")[1]

        img_bytes = base64.b64decode(image_data)

        np_arr = np.frombuffer(
            img_bytes,
            np.uint8
        )

        frame = cv2.imdecode(
            np_arr,
            cv2.IMREAD_COLOR
        )

        if frame is None:
            return {
                "state": "No Face",
                "ear": 0,
                "mar": 0,
                "sleep_risk": False,
                "alarm": False
            }

        h, w, _ = frame.shape

        rgb = cv2.cvtColor(
            frame,
            cv2.COLOR_BGR2RGB
        )

        result = face_mesh.process(rgb)

        if not result.multi_face_landmarks:

            return {
                "state": "No Face",
                "ear": 0,
                "mar": 0,
                "sleep_risk": False,
                "alarm": False
            }

        face = result.multi_face_landmarks[0]

        left_eye = get_points(
            face,
            LEFT_EYE,
            w,
            h
        )

        right_eye = get_points(
            face,
            RIGHT_EYE,
            w,
            h
        )

        ear = (
            eye_aspect_ratio(left_eye)
            +
            eye_aspect_ratio(right_eye)
        ) / 2

        mouth = get_points(
            face,
            MOUTH,
            w,
            h
        )

        mar = mouth_aspect_ratio(mouth)

        eyes_closed = ear < EAR_THRESHOLD

        yawn = mar > MAR_THRESHOLD

        head_sleep = head_sleep_check(face)

        current_state = (
            eyes_closed
            or yawn
            or head_sleep
        )

        eye_history.append(
            1 if current_state else 0
        )

        ratio = (
            sum(eye_history)
            /
            len(eye_history)
        )

        sleep_risk = ratio > 0.75

        if sleep_risk:
            state = "Dangerous"
        elif ear < 0.25:
            state = "Drowsy"
        else:
            state = "Safe"

        return {
            "state": state,
            "ear": round(ear, 3),
            "mar": round(mar, 3),
            "sleep_risk": sleep_risk,
            "alarm": sleep_risk
        }

    except Exception as e:

        return {
            "state": "Error",
            "ear": 0,
            "mar": 0,
            "sleep_risk": False,
            "alarm": False,
            "error": str(e)
        }
