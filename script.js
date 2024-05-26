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
            <title>${name}'s Portfolio</title>
            <link rel="stylesheet" href="style.css">
            <style>
                body {
                    background-color: ${color_theme};
                }
            </style>
        </head>
        <body>
            <h1>${name}</h1>
            <h2>${profession}</h2>
            ${photoUrl ? `<img src="${photoUrl}" alt="Photo">` : ''}
            <p>${bio}</p>
            <h3>Education</h3>
            <p>${education}</p>
            <h3>Skills</h3>
            <ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
            ${research ? `<h3>Research/Publication</h3><p>${research}</p>` : ''}
            ${interests ? `<h3>Interests</h3><p>${interests}</p>` : ''}
            ${awards ? `<h3>Awards & Certificates</h3><p>${awards}</p>` : ''}
            <h3>Contact</h3>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>Address: ${address}</p>
            ${social_media.length ? `<h3>Social Media</h3><ul>${social_media.map(link => `<li>${link}</li>`).join('')}</ul>` : ''}
            ${projects ? `<h3>Projects</h3><p>${projects}</p>` : ''}
            <h3>Experience</h3>
            <p>${experience}</p>
            ${resumeUrl ? `<a href="${resumeUrl}" download="resume.pdf">Download Resume</a>` : ''}
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
