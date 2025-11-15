/**
 * Template Name: DevFolio
 * Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
    "use strict";

    // Initialize EmailJS with your public key
    emailjs.init({
        publicKey: "yu_iFcYIRDNnLs5Fy" // from EmailJS dashboard
    });

    /**
     * Apply .scrolled class to the body as the page is scrolled down
     */
    function toggleScrolled() {
        const selectBody = document.querySelector('body');
        const selectHeader = document.querySelector('#header');
        if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
        window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
    }

    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);

    /**
     * Mobile nav toggle
     */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    function mobileNavToogle() {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
    }

    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
        navmenu.addEventListener('click', () => {
            if (document.querySelector('.mobile-nav-active')) {
                mobileNavToogle();
            }
        });

    });

    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
        navmenu.addEventListener('click', function (e) {
            e.preventDefault();
            this.parentNode.classList.toggle('active');
            this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
            e.stopImmediatePropagation();
        });
    });

    /**
     * Preloader
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }

    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector('.scroll-top');

    function toggleScrollTop() {
        if (scrollTop) {
            window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
    }

    scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);

    /**
     * Animation on scroll function and init
     */
    function aosInit() {
        AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    window.addEventListener('load', aosInit);

    /**
     * Init typed.js
     */
    const selectTyped = document.querySelector('.typed');
    if (selectTyped) {
        let typed_strings = selectTyped.getAttribute('data-typed-items');
        typed_strings = typed_strings.split(',');
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    /**
     * Init isotope layout and filters
     */
    document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
        let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
        let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
        let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

        let initIsotope;
        imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
            initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
                itemSelector: '.isotope-item',
                layoutMode: layout,
                filter: filter,
                sortBy: sort
            });
        });

        isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
            filters.addEventListener('click', function () {
                isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
                this.classList.add('filter-active');
                initIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                if (typeof aosInit === 'function') {
                    aosInit();
                }
            }, false);
        });

    });

    /**
     * Frequently Asked Questions Toggle
     */
    document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
        faqItem.addEventListener('click', () => {
            faqItem.parentNode.classList.toggle('faq-active');
        });
    });

    /**
     * Init swiper sliders
     */
    function initSwiper() {
        document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
            let config = JSON.parse(
                swiperElement.querySelector(".swiper-config").innerHTML.trim()
            );

            if (swiperElement.classList.contains("swiper-tab")) {
                initSwiperWithCustomPagination(swiperElement, config);
            } else {
                new Swiper(swiperElement, config);
            }
        });
    }

    window.addEventListener("load", initSwiper);

    /**
     * Correct scrolling position upon page load for URLs containing hash links.
     */
    window.addEventListener('load', function (e) {
        if (window.location.hash) {
            if (document.querySelector(window.location.hash)) {
                setTimeout(() => {
                    let section = document.querySelector(window.location.hash);
                    let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
                    window.scrollTo({
                        top: section.offsetTop - parseInt(scrollMarginTop),
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    });

    /**
     * Navmenu Scrollspy
     */
    let navmenulinks = document.querySelectorAll('.navmenu a');

    function navmenuScrollspy() {
        navmenulinks.forEach(navmenulink => {
            if (!navmenulink.hash) return;
            let section = document.querySelector(navmenulink.hash);
            if (!section) return;
            let position = window.scrollY + 200;
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
                navmenulink.classList.add('active');
            } else {
                navmenulink.classList.remove('active');
            }
        })
    }

    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);

    function generateEachProgress(progressId, percentage) {
        var circle = new ProgressBar.Circle('.skill-progress-' + progressId, {
            color: '#0078ff',
            strokeWidth: 6,
            trailWidth: 6,
            duration: 2000,
            easing: 'easeInOut',
            text: {
                autoStyleContainer: false
            },
            from: {color: '#aaa', width: 6},
            to: {color: '#0078ff', width: 6},
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);
                var value = Math.round(circle.value() * 100);
                circle.setText(value + '%');
            }
        });

        circle.text.style.fontFamily = 'Arial';
        circle.text.style.fontSize = '1rem';
        circle.text.style.position = 'absolute';
        circle.text.style.left = '50%';
        circle.text.style.top = '50%';
        circle.text.style.transform = 'translate(-50%, -50%)';
        circle.text.style.margin = '0';
        circle.text.style.textAlign = 'center';
        circle.animate(percentage / 100);
    }

    function generateProgressLanguage() {
        let html = '';
        languages.forEach((l, i) => {
            let endBorder = i === 1 ? "end-border" : "";
            html += `
             <div class="col-md-4 ${endBorder}">
                <div class="text-center type">${l.type}</div>
                <div class="row">
            `;
            l.langs.forEach(la => {
                let result = la.lang.replace(/ /g, "-");
                html += `
                   <div class="col-4 p-1 skill-box">
                        <div class="skill-language">
                            <div class="title">${la.lang}</div>
                            <div class="skill-progress skill-progress-${result}"></div>
                         </div>
                   </div>
                    `
            });
            html += ` 
                </div>
              </div>
            `
        })
        document.getElementById('list-skill').innerHTML = html;

        languages.forEach(l => {
            l.langs.forEach(la => {
                let result = la.lang.replace(/ /g, "-");
                generateEachProgress(result, la.percentage)
            })
        })
    }

    generateProgressLanguage();

    function generateExperience() {
        let html = '';
        experiences.forEach((experience, i) => {
            html += `
                <div class="resume-item">
                  <h4>${experience.position}</h4>
                  <h5>${experience.startY} - ${experience.endY ? experience.endY : "Present"}</h5>
                  <p><em> ${experience.location} </em></p>
                  <ul>
            `;

            experience.details.forEach(detail => {
                html += `
                    <li>${detail}</li>
                `
            })

            html += `
             </ul>
                </div>
            `
        })
        document.getElementById('display-experience').innerHTML = html;
    }
    generateExperience();
    function sendMailToMailBox(name, subject, message, email) {
        let date = new Date();
        emailjs.send("service_lmqt8nr", "template_qnw0t5p", {
            name: name,
            title: subject,
            message: message,
            time: date.getMilliseconds(),
            fromEmail: email
        })
            .then(() => {
                Swal.fire({
                    title: "Message sent",
                    text: "Thanks you for your message!",
                    icon: "success",
                });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error Message",
                    text: "Something went wrong",
                    icon: "error"
                });
            });
    }
    function sendMail(){
        let name = document.getElementById('txt_name').value;
        let email = document.getElementById('txt_email').value;
        let subject = document.getElementById('txt_subject').value;
        let message = document.getElementById('txt_message').value;
        let btnSendMail = document.getElementById('btn_send_message');
        btnSendMail.addEventListener('click', function(){
            sendMailToMailBox(name, email, subject, message, btnSendMail);
        });
    }
    sendMail();

})();