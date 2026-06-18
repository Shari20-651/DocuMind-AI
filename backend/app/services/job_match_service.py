def compare_skills(
    job_description,
    resume_skills
):
    jd = job_description.lower()

    matched = []
    missing = []

    for skill in resume_skills:
        if skill.lower() in jd:
            matched.append(skill)

    common_skills = [
        "Python",
        "SQL",
        "FastAPI",
        "REST APIs",
        "Docker",
        "AWS",
        "Git",
        "CI/CD",
        "MongoDB",
        "React"
    ]

    for skill in common_skills:
        if (
            skill.lower() in jd
            and skill not in matched
        ):
            missing.append(skill)

    return matched, missing