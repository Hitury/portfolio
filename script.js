const projectbtn = document.getElementById("project-btn-main");
const contactbtn = document.getElementById("contact-btn-main");
const btnflat = document.getElementById("btn-flat");
const textelm = document.getElementById("fade-text");
const main = document.getElementById("main");
const json_quiz_btn = document.getElementById("json-quiz-clickable");
const kaas_btn = document.getElementById("kaas-design-clickable");
const login_btn = document.getElementById("login-design-clickable");



window.addEventListener("DOMContentLoaded", function() {
    main.className = "visible";
    const animatedList = document.querySelectorAll(".animated");

    function checkDivVisibility() {
        animatedList.forEach(animated => {
            const divTop = animated.offsetTop;
            const divHeight = animated.offsetHeight;
            const scrollPosition = window.pageYOffset;
            const windowHeight = window.innerHeight;

            // Check if the bottom of the div is above the top of the viewport
            if (divTop < scrollPosition + windowHeight) {
                animated.classList.add('show');
            } else {
            
            }

            const divCenter = divTop + divHeight / 2;
            const windowCenter = scrollPosition + windowHeight / 2;

            if (divCenter < windowCenter) {
                
            } else {
                animated.classList.remove('show');
            }
            })
        }

    window.addEventListener('scroll', function() {
    checkDivVisibility();
    });
    window.addEventListener('load', function() {
    checkDivVisibility();
    }); 
})

json_quiz_btn.addEventListener("click", function() {
    window.location.href = "JSON/index.html";
})

login_btn.addEventListener("click", function() {
    window.location.href = "login.html";
})

kaas_btn.addEventListener("click", function() {
    window.location.href = "Kaasquiz/index.html";
})

