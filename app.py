from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

PORTFOLIO_DATA = {
    "name": "Aryan Kumar",
    "title": "Full Stack Developer | AI & ML Enthusiast",
    "tagline": "Building intelligent systems and impactful digital experiences.",
    "email": "aryankumar735588@gmail.com",
    "github": "https://github.com/Aryan210804",
    "linkedin": "https://www.linkedin.com/in/aryan-kumar-487953297/",
    "skills": {
        "Programming": [
            {"name": "Python", "level": 80, "icon": "🐍"},
            {"name": "Java", "level": 65, "icon": "☕"},
            {"name": "JavaScript", "level": 70, "icon": "⚡"},
        ],
        "Web Development": [
            {"name": "HTML/CSS", "level": 90, "icon": "🌐"},
            {"name": "Django", "level": 72, "icon": "🎸"},
            {"name": "Flask", "level": 78, "icon": "🔥"},
        ],
        "AI / ML": [
            {"name": "TensorFlow", "level": 68, "icon": "🤖"},
            {"name": "OpenCV", "level": 75, "icon": "👁️"},
            {"name": "Deep Learning", "level": 65, "icon": "🧠"},
        ],
        "Tools": [
            {"name": "Git & GitHub", "level": 85, "icon": "🐙"},
            {"name": "VS Code", "level": 92, "icon": "💻"},
            {"name": "Android Studio", "level": 60, "icon": "📱"},
        ],
    },
    "projects": [
        {
            "title": "AI Road Crossing Assistant",
            "description": "An AI-powered assistive system for visually impaired individuals that detects vehicles, traffic signals, and obstacles in real time using computer vision, providing audio alerts for safe road crossing.",
            "tech": ["Python", "OpenCV", "TensorFlow", "Deep Learning"],
            "github": "https://github.com/Aryan210804",
            "color": "cyan",
            "icon": "🚦",
            "featured": True,
            "category": "ai",
        },
        {
            "title": "AI Chatbot — Gemini API",
            "description": "An intelligent conversational chatbot powered by Google's Gemini API. Features context-aware dialogue, real-time AI responses, and a clean chat UI built with Flask and JavaScript.",
            "tech": ["Python", "Gemini API", "Flask", "JavaScript"],
            "github": "https://github.com/Aryan210804",
            "color": "purple",
            "icon": "🤖",
            "featured": True,
            "category": "ai",
        },
        {
            "title": "Movie Recommendation System",
            "description": "A machine learning-powered recommendation engine that suggests similar movies based on genre, keywords, and ratings using content-based filtering — inspired by Netflix's algorithm.",
            "tech": ["Python", "Pandas", "scikit-learn", "Flask"],
            "github": "https://github.com/Aryan210804",
            "color": "orange",
            "icon": "🎬",
            "featured": False,
            "category": "ai",
        },
        {
            "title": "Face Detection System",
            "description": "A real-time face detection app using OpenCV that identifies and tracks multiple human faces from webcam feeds with bounding box visualization — practical use in security & biometrics.",
            "tech": ["Python", "OpenCV", "Haar Cascade", "CV2"],
            "github": "https://github.com/Aryan210804",
            "color": "green",
            "icon": "👁️",
            "featured": False,
            "category": "ai",
        },
        {
            "title": "LearnX — Learning Platform",
            "description": "A full-featured multi-course online learning platform inspired by W3Schools & Coursera. Includes structured lessons, progress tracking, code examples, practice quizzes, and a responsive dashboard.",
            "tech": ["Python", "Flask", "HTML/CSS", "JavaScript"],
            "github": "https://github.com/Aryan210804",
            "color": "blue",
            "icon": "📚",
            "featured": True,
            "category": "web",
        },
        {
            "title": "Learn-With-AK — Tech Roadmap",
            "description": "A developer roadmap platform guiding learners step-by-step through technology paths — Frontend, Backend, AI/ML, and Android — with visual interactive roadmap diagrams and curated resources.",
            "tech": ["Python", "Flask", "JavaScript", "JSON"],
            "github": "https://github.com/Aryan210804",
            "color": "cyan",
            "icon": "🗺️",
            "featured": True,
            "category": "web",
        },
        {
            "title": "Quiz App with Scoreboard",
            "description": "A feature-rich Android quiz app with multiple-choice questions, real-time score calculation, a live scoreboard, and category-based quizzes built using Java and Android Studio.",
            "tech": ["Java", "Android Studio", "XML", "Firebase"],
            "github": "https://github.com/Aryan210804",
            "color": "purple",
            "icon": "🎯",
            "featured": True,
            "category": "android",
        },
        {
            "title": "Portfolio App (Android)",
            "description": "An Android mobile version of my developer portfolio with interactive UI components, smooth page transitions, and a modern Material Design system.",
            "tech": ["Java", "Android Studio", "XML", "Material Design"],
            "github": "https://github.com/Aryan210804",
            "color": "blue",
            "icon": "📱",
            "featured": False,
            "category": "android",
        },
        {
            "title": "Image Processing Toolkit",
            "description": "A Python toolkit implementing core image processing operations — rotation, scaling, translation, addition, and subtraction — built with OpenCV and NumPy for practical computer vision experiments.",
            "tech": ["Python", "OpenCV", "NumPy", "Matplotlib"],
            "github": "https://github.com/Aryan210804",
            "color": "green",
            "icon": "🖼️",
            "featured": False,
            "category": "python",
        },
    ],
    "achievements": [
        {
            "year": "2026",
            "title": "3rd Place — SPARKTECH 2K26 International Symposium",
            "description": "Secured 3rd place at the AI TechSprint track of SPARKTECH 2K26, an International Symposium held at Anantrao Pawar College of Engineering & Research, Pune. Presented AI-Based Smart Road Crossing Assistance for Visually Impaired.",
            "icon": "🥉",
            "highlight": True,
        },
        {
            "year": "2026",
            "title": "Dipnova 2026 Project Competition",
            "description": "Presented the AI Road Crossing Assistant — an innovative solution for visually impaired road safety using computer vision.",
            "icon": "🏆",
            "highlight": True,
        },
        {
            "year": "2026",
            "title": "DIPEX Idea Presentation",
            "description": "Showcased groundbreaking tech ideas at DIPEX on February 14, 2026, earning recognition for innovative thinking.",
            "icon": "💡",
            "highlight": False,
        },
        {
            "year": "2025",
            "title": "SIH – Smart India Hackathon",
            "description": "Winner at the College Level of Smart India Hackathon — competed with a real-world problem-solving solution.",
            "icon": "🥇",
            "highlight": True,
        },
    ],
    "currently_building": [
        {"item": "AI Road Crossing Assistant — advanced version", "icon": "🚦"},
        {"item": "Gemini AI Chatbot with memory & context", "icon": "🤖"},
        {"item": "Android Quiz App — new categories & UI overhaul", "icon": "📱"},
        {"item": "Movie Recommendation System — collaborative filtering", "icon": "🎬"},
        {"item": "Deep Learning & Computer Vision experiments", "icon": "🧠"},
    ],
}


@app.route("/")
def index():
    return render_template("index.html", data=PORTFOLIO_DATA)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
