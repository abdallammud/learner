document.addEventListener('DOMContentLoaded', () => {
    const allCoursesDiv = document.getElementById('allCourses');
    const addCourseForm = document.getElementById('addCourse');

    const fetchCourses = async () => {
        const response = await fetch('/api/courses');
        const data = await response.json();
        displayCourses(data.courses);
    };

    const displayCourses = (courses) => {
        allCoursesDiv.innerHTML = '';
        courses.forEach(course => {
            allCoursesDiv.innerHTML += `
                <article>
                    <h3>${course.title}</h3>
                    <p>${course.author}</p>
                    <a href="${course.link}">More Info</a>
                </article>`;
        });
    };

    addCourseForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(addCourseForm);
        const newCourse = Object.fromEntries(formData.entries());

        await fetch('/api/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCourse),
        });

        addCourseForm.reset();
        fetchCourses();
    });

    fetchCourses();
});
