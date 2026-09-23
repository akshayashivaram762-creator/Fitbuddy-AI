from pathlib import Path

from fastapi import APIRouter, Form
from fastapi.responses import FileResponse, HTMLResponse

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parent.parent
TEMPLATE_PATH = BASE_DIR / "template" / "index.html"


@router.get("/")
async def home():
    return FileResponse(TEMPLATE_PATH)


@router.get("/health")
async def health_check():
    return {"status": "ok"}


@router.post("/generate-workout")
async def generate_workout(
    name: str = Form(...),
    age: int = Form(...),
    gender: str | None = Form(default=None),
    fitness_goal: str = Form(...),
    activity_level: str = Form(...),
    weight: str | None = Form(default=None),
):
    gender_text = gender or "Not specified"
    weight_text = weight or "Not provided"
    plan_items = [
        "Day 1: Strength focus — squats, push-ups, rows",
        "Day 2: Cardio + core — brisk walk and planks",
        "Day 3: Recovery — mobility, stretch, and light yoga",
        "Day 4: Upper-body strength — shoulder presses, lunges, pull-ups",
        "Day 5: Conditioning — cycling or interval training",
        "Day 6: Full-body circuit — deadlifts, presses, and balance work",
        "Day 7: Active recovery — walk, stretch, and hydration focus",
    ]
    plan_html = "\n".join(
        f"<li>{item}</li>" for item in plan_items
    )

    html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FitBuddy Plan</title>
        <link rel="stylesheet" href="/static/styles.css" />
    </head>
    <body>
        <main style="max-width: 900px; margin: 40px auto; padding: 24px; font-family: Arial, sans-serif;">
            <h1>🏋️ FitBuddy Fitness Plan</h1>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Age:</strong> {age}</p>
            <p><strong>Gender:</strong> {gender_text}</p>
            <p><strong>Goal:</strong> {fitness_goal}</p>
            <p><strong>Activity Level:</strong> {activity_level}</p>
            <p><strong>Weight:</strong> {weight_text}</p>

            <h2>Your 7-Day Plan</h2>
            <ul>
                {plan_html}
            </ul>

            <p><a href="/">Back to Home</a></p>
        </main>
    </body>
    </html>
    """
    return HTMLResponse(content=html)
