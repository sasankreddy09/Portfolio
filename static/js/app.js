const cursor = document.querySelector('.cursor');
const skills = document.querySelector(".skills");
const skillSet = ['"Fullstack Developer."', '"DSA Enthusiast."',   '"Python Developer."'];
let skillIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    let currentSkill = skillSet[skillIndex];
    
    if (!isDeleting) {
        skills.textContent = currentSkill.slice(0, charIndex++);
    } else {
        skills.textContent = currentSkill.slice(0, charIndex--);
        if(charIndex==0){
            skills.textContent="";
        }
    }

    if (!isDeleting && charIndex === currentSkill.length + 1) {
        isDeleting = true;
        setTimeout(typeEffect, 1000); // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        skillIndex = (skillIndex + 1) % skillSet.length; // Move to next skill
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 60 : 100); // Speed variation
    }
}

// Start the effect
typeEffect();

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = 1;
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = 0;
});
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll("img.lazy");
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));
});
function toggleMenu() {
    const menu = document.getElementById("dropdown-menu");
    menu.classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", function () {
    let sections = ["homes", "projectss", "certificatess", "abouts", "skillss", "contacts"];

    sections.forEach(element => {
        let link = document.querySelector(`a[href=".${element}"]`);

        if (link) {
            link.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent the default link behavior
                console.log("hello")
                let targetSection = document.querySelector(`#${element}`);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }
            });
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let sections = ["home", "projects", "certificates", "about", "skills", "contact"];

    sections.forEach(element => {
        let link = document.querySelector(`a[href="#${element}"]`);

        if (link) {
            link.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent the default link behavior
                console.log("hello")
                let targetSection = document.querySelector(`#${element}`);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }
            });
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let progressBars = document.querySelectorAll(".progress");

    progressBars.forEach(bar => {
        let width = parseInt(bar.getAttribute("data-width")); // Get percentage value
        let h3 = bar.closest(".progress-bar").previousElementSibling; // Get the heading element
        let percentSpan = h3.querySelector(".percent"); // Find the percentage inside h3

        animateProgressBar(bar, width);
        animatePercentage(percentSpan, width);
    });
});

/**
 * Function to animate the progress bar width
 */
function animateProgressBar(bar, targetWidth) {
    let currentWidth = 0;
    let interval = setInterval(() => {
        if (currentWidth >= targetWidth) {
            clearInterval(interval);
        } else {
            currentWidth++;
            bar.style.width = currentWidth + "%";
        }
    }, 25);
}

/**
 * Function to animate the percentage text
 */
function animatePercentage(percentSpan, targetValue) {
    let currentValue = 0;
    let interval = setInterval(() => {
        if (currentValue >= targetValue) {
            clearInterval(interval);
        } else {
            currentValue++;
            if (percentSpan) {
                percentSpan.textContent = currentValue + "%";
            }
        }
    }, 15);
}
let icons=document.querySelectorAll(".icon");
let ele=document.querySelectorAll(".optional");
icons=[...icons, ...ele]
icons.forEach(element => {
    element.addEventListener("click",()=>{
        var menu = document.getElementById("dropdown");
        var bars = document.querySelector(".bars");
        var mark = document.querySelector(".mark");
        console.log("hello")
        if (menu.classList.contains("active")) {
            menu.classList.remove("active");
            bars.style.display = "block";
            mark.style.display = "none";
        } else {
            menu.classList.add("active");
            bars.style.display = "none";
            mark.style.display = "block";
        }
    })
    
});
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section"); // All sections
    const navLinks = document.querySelectorAll(".options a"); // Navbar links

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove 'active' class from all links
                navLinks.forEach(link => link.classList.remove("active"));

                // Find the link that matches the current section
                const activeLink = document.querySelector(`.options a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of section is visible

    sections.forEach(section => observer.observe(section));
});
