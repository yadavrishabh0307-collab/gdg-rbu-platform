// Default production-quality GDG RBU Events
export const DEFAULT_EVENTS = [
  {
    id: 1,
    title: "Google Cloud Study Jam & GenAI Workshop",
    description: "Hands-on cloud architecture workshop using Google Cloud Platform, BigQuery, Gemini API, and Vertex AI. Build real cloud pipelines with guided labs and earn official Google Cloud skill badges and certificates.",
    date_time: "2026-10-18T10:00:00",
    venue: "CS Seminar Hall, RBU Campus",
    capacity: 75,
    category: "Workshop",
    image_url: null,
    is_active: true,
    registered_count: 42,
    is_full: false,
  },
  {
    id: 2,
    title: "Flutter & Dart Mobile Bootcamp",
    description: "Master cross-platform mobile development with Flutter. Build beautiful, native iOS and Android apps from scratch with state management, animations, and Firebase backend integration.",
    date_time: "2026-10-24T14:00:00",
    venue: "Main Auditorium, RBU Campus",
    capacity: 120,
    category: "Bootcamp",
    image_url: null,
    is_active: true,
    registered_count: 88,
    is_full: false,
  },
  {
    id: 3,
    title: "TensorFlow & Deep Learning Crash Course",
    description: "Introduction to neural networks, computer vision, and machine learning models using TensorFlow 2.x and Google Colab. Train and deploy your first computer vision model with industry mentors.",
    date_time: "2026-10-28T11:00:00",
    venue: "Computer Center Lab 3, RBU",
    capacity: 50,
    category: "Tech Talk",
    image_url: null,
    is_active: true,
    registered_count: 31,
    is_full: false,
  },
  {
    id: 4,
    title: "Open Source Contribution Drive & Git Masterclass",
    description: "Learn how to contribute to high-impact open source repositories, create quality pull requests, participate in Google Summer of Code (GSoC), and level up your developer portfolio.",
    date_time: "2026-11-04T15:00:00",
    venue: "Conference Hall, RBU Campus",
    capacity: 90,
    category: "Workshop",
    image_url: null,
    is_active: true,
    registered_count: 54,
    is_full: false,
  },
  {
    id: 5,
    title: "DevFest RBU 2026 — Annual Flagship Festival",
    description: "The biggest annual developer conference in Central India! Keynote tech talks by Google Developer Experts, multi-track workshops, hackathon showcases, developer networking, and exclusive swag.",
    date_time: "2026-11-15T09:30:00",
    venue: "RBU Convention Center & Campus Grounds",
    capacity: 350,
    category: "Festival",
    image_url: null,
    is_active: true,
    registered_count: 215,
    is_full: false,
  },
  {
    id: 6,
    title: "WebWiz 2.0: 24-Hour Full-Stack Hackathon",
    description: "GDG RBU's premier student hackathon. Form teams of 2-4 and build production-ready solutions for campus and societal problems within 24 hours. Cash prizes, mentorship, and certificates.",
    date_time: "2026-11-28T09:00:00",
    venue: "IT Innovation Center, RBU",
    capacity: 150,
    category: "Bootcamp",
    image_url: null,
    is_active: true,
    registered_count: 110,
    is_full: false,
  },
]

// Fallback search and filter for events
export function filterDefaultEvents({ search = '', category = '', upcoming = false } = {}) {
  let list = [...DEFAULT_EVENTS]
  if (search) {
    const q = search.toLowerCase()
    list = list.filter(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q))
  }
  if (category) {
    list = list.filter(e => e.category.toLowerCase() === category.toLowerCase())
  }
  if (upcoming) {
    const now = new Date()
    list = list.filter(e => new Date(e.date_time) >= now)
  }
  return list
}
