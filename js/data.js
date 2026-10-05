// ============================================================
// EDITABLE DATA — change student details and experiments here.
// You do NOT need to touch the UI code (app.js / index.html).
// ============================================================

const STUDENT = {
  photo: "assets/images/student-photo.jpg", // replace with your photo file
  name: "Arjun Reddy",
  idNumber: "S2026-0001",
  section: "Section A",
  faculty: "Faculty of Engineering",
  profession: "B.Tech Data Science Student"
};

const SUBJECT_CODE = "DS-LAB-401";

// Module names — edit / rename these as you like.
const MODULES = [
  "Module 1 — Getting Started with Data Science",
  "Module 2 — Data Wrangling",
  "Module 3 — Data Visualization",
  "Module 4 — NumPy & Statistics"
];

const experiments = [
  {
    id: 1,
    name: "Experiment 1 — Data Cleaning",
    module: "Module 2 — Data Wrangling",
    previewVideo: "assets/videos/exp1-preview.mp4",
    youtubeVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubLink: "https://github.com/example/experiment-1-data-cleaning",
    summary: "This experiment covers loading data with pandas, handling missing values, removing duplicates, and basic data type conversions to prepare a clean dataset for analysis.",
    sections: [
      { letter: "A", title: "Loading the Dataset", video: "assets/videos/exp1-a.mp4",
        code: "import pandas as pd\n\ndata = pd.read_csv('data.csv')\nprint(data.head())" },
      { letter: "B", title: "Handling Missing Values", video: "assets/videos/exp1-b.mp4",
        code: "data = data.dropna()\n# or fill\ndata['age'] = data['age'].fillna(data['age'].mean())" },
      { letter: "C", title: "Removing Duplicates", video: "assets/videos/exp1-c.mp4",
        code: "data = data.drop_duplicates()\nprint(data.shape)" }
    ]
  },
  {
    id: 2,
    name: "Experiment 2 — Data Visualization",
    module: "Module 3 — Data Visualization",
    previewVideo: "assets/videos/exp2-preview.mp4",
    youtubeVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubLink: "https://github.com/example/experiment-2-visualization",
    summary: "This experiment introduces Matplotlib and Seaborn for creating line charts, bar charts, histograms, and heatmaps to explore and present data visually.",
    sections: [
      { letter: "A", title: "Line Charts", video: "assets/videos/exp2-a.mp4",
        code: "import matplotlib.pyplot as plt\nplt.plot([1,2,3],[4,5,6])\nplt.show()" },
      { letter: "B", title: "Bar Charts", video: "assets/videos/exp2-b.mp4",
        code: "plt.bar(['A','B','C'],[3,7,5])\nplt.show()" },
      { letter: "C", title: "Histograms", video: "assets/videos/exp2-c.mp4",
        code: "plt.hist(data['age'], bins=10)\nplt.show()" },
      { letter: "D", title: "Heatmaps", video: "assets/videos/exp2-d.mp4",
        code: "import seaborn as sns\nsns.heatmap(data.corr(), annot=True)" },
      { letter: "E", title: "Scatter Plots", video: "assets/videos/exp2-e.mp4",
        code: "plt.scatter(data['a'], data['b'])\nplt.show()" }
    ]
  },
  {
    id: 3,
    name: "Experiment 3 — Pandas",
    module: "Module 2 — Data Wrangling",
    previewVideo: "assets/videos/exp3-preview.mp4",
    youtubeVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubLink: "https://github.com/example/experiment-3-pandas",
    summary: "This experiment covers pandas Series and DataFrames, indexing, filtering, grouping, and merging datasets for real-world data manipulation.",
    sections: [
      { letter: "A", title: "Series & DataFrames", video: "assets/videos/exp3-a.mp4",
        code: "import pandas as pd\ns = pd.Series([1,2,3])\ndf = pd.DataFrame({'a':[1,2],'b':[3,4]})" },
      { letter: "B", title: "Filtering & Indexing", video: "assets/videos/exp3-b.mp4",
        code: "print(df[df['a'] > 1])" }
    ]
  },
  {
    id: 4,
    name: "Experiment 4 — NumPy",
    module: "Module 4 — NumPy & Statistics",
    previewVideo: "assets/videos/exp4-preview.mp4",
    youtubeVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    githubLink: "https://github.com/example/experiment-4-numpy",
    summary: "This experiment introduces NumPy arrays, vectorized operations, broadcasting, and common mathematical and statistical functions.",
    sections: [
      { letter: "A", title: "Arrays", video: "assets/videos/exp4-a.mp4",
        code: "import numpy as np\na = np.array([1,2,3])\nprint(a * 2)" },
      { letter: "B", title: "Broadcasting", video: "assets/videos/exp4-b.mp4",
        code: "b = np.ones((3,3))\nprint(b + 5)" },
      { letter: "C", title: "Statistics", video: "assets/videos/exp4-c.mp4",
        code: "print(np.mean(a), np.std(a))" }
    ]
  }
];
