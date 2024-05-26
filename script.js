function generatePortfolio() {
    const form = document.getElementById('portfolio-form');
    const formData = new FormData(form);

    const name = formData.get('name');
    const profession = formData.get('profession');
    const bio = formData.get('bio');
    const education = formData.get('education');
    const skills = formData.get('skills').split(',');
    const research = formData.get('research');
    const interests = formData.get('interests');
    const awards = formData.get('awards');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const social_media = formData.get('social_media').split(',');
    const projects = formData.get('projects');
    const experience = formData.get('experience');
    const color_theme = formData.get('color_theme');
    const photo = formData.get('photo');
    const resume = formData.get('resume');

    const photoUrl = photo ? URL.createObjectURL(photo) : null;
    const resumeUrl = resume ? URL.createObjectURL(resume) : null;

    const portfolioHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{ name }}'s Portfolio</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body class="{{ color_theme }}">
        <header>
            <div class="container">
                <img src="{{ photo_path }}" alt="{{ name }}" class="profile-photo">
                <h1>{{ name }}</h1>
                <h2>{{ profession }}</h2>
            </div>
        </header>
        <main>
            <div class="container">
                <section class="bio">
                    <h2>Bio</h2>
                    <p>{{ bio }}</p>
                </section>
    
                <section class="education">
                    <h2>Education</h2>
                    <p>{{ education }}</p>
                </section>
    
                {% if skills %}
                <section class="skills">
                    <h2>Skills</h2>
                    <ul>
                        {% for skill in skills %}
                        <li>{{ skill }}</li>
                        {% endfor %}
                    </ul>
                </section>
                {% endif %}
    
                {% if research %}
                <section class="research">
                    <h2>Research/Publications</h2>
                    <p>{{ research }}</p>
                </section>
                {% endif %}
    
                {% if interests %}
                <section class="interests">
                    <h2>Interests</h2>
                    <p>{{ interests }}</p>
                </section>
                {% endif %}
    
                {% if awards %}
                <section class="awards">
                    <h2>Awards & Certificates</h2>
                    <p>{{ awards }}</p>
                </section>
                {% endif %}
    
                <section class="contact">
                    <h2>Contact</h2>
                    <p>Email: {{ email }}</p>
                    <p>Phone: {{ phone }}</p>
                    <p>Address: {{ address }}</p>
                    <p>Social Media: {{ social_media }}</p>
                </section>
    
                {% if projects %}
                <section class="projects">
                    <h2>Projects</h2>
                    {% for project in projects %}
                    <div class="project">
                        <h3>{{ project.name }}</h3>
                        <p>{{ project.date }}</p>
                        <p>{{ project.details }}</p>
                        {% if project.website %}
                        <p><a href="{{ project.website }}" target="_blank">Project Link</a></p>
                        {% endif %}
                    </div>
                    {% endfor %}
                </section>
                {% endif %}
    
                <section class="experience">
                    <h2>Experience</h2>
                    <p>{{ experience }}</p>
                </section>
    
                {% if resume_path %}
                <section class="resume">
                    <h2>Resume</h2>
                    <p><a href="{{ resume_path }}" download>Download Resume</a></p>
                </section>
                {% endif %}
            </div>
        </main>
        <footer>
            <div class="container">
                <p>&copy; {{ name }}'s Portfolio</p>
            </div>
        </footer>
    </body>
    </html>
    
    `;

    localStorage.setItem('portfolioHtml', portfolioHtml);
    window.location.href = 'preview.html';
}

function loadPreview() {
    const portfolioHtml = localStorage.getItem('portfolioHtml');
    document.getElementById('portfolio-preview').innerHTML = portfolioHtml;
}

function downloadPortfolio() {
    const portfolioHtml = localStorage.getItem('portfolioHtml');
    const zip = new JSZip();
    zip.file('index.html', portfolioHtml);

    zip.generateAsync({ type: 'blob' })
        .then(content => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'portfolio.zip';
            link.click();
        });
}

if (window.location.pathname.endsWith('preview.html')) {
    loadPreview();
}
