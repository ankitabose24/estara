/* =====================================================
   ESTARA REAL ESTATE
   Discover. Choose. Belong.
===================================================== */


/* ================= FEATURED PROPERTIES ================= */

const propertyData = [

    {
        status: "For Sale",
        title: "The Elysian Villa",
        location: "Whitefield, Bengaluru",
        specs: "4 Beds · 4.5 Baths · 3,250 Sq Ft",
        price: "₹3.85 Cr",

        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
    },

    {
        status: "For Sale",
        title: "Indiranagar Residence",
        location: "Indiranagar, Bengaluru",
        specs: "3 Beds · 3 Baths · 2,100 Sq Ft",
        price: "₹2.45 Cr",

        image:
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
    },

    {
        status: "For Rent",
        title: "Skyline Penthouse",
        location: "Hebbal, Bengaluru",
        specs: "2 Beds · 2.5 Baths · 1,800 Sq Ft",
        price: "₹65,000 / month",

        image:
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85"
    }

];


/* ================= RENTAL PROPERTIES ================= */

const rentals = [

    {
        title: "Skyline Penthouse",
        location: "Hebbal, Bengaluru",
        specs: "2 Beds · 2.5 Baths · 1,800 Sq Ft",
        price: "₹65,000 / month",

        image:
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85"
    },

    {
        title: "Garden View Apartment",
        location: "Whitefield, Bengaluru",
        specs: "2 Beds · 2 Baths · 1,350 Sq Ft",
        price: "₹42,000 / month",

        image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
    },

    {
        title: "Indiranagar Courtyard Home",
        location: "Indiranagar, Bengaluru",
        specs: "3 Beds · 3 Baths · 2,000 Sq Ft",
        price: "₹78,000 / month",

        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
    },

    {
        title: "Sarjapur Family Villa",
        location: "Sarjapur Road, Bengaluru",
        specs: "3 Beds · 3.5 Baths · 2,400 Sq Ft",
        price: "₹58,000 / month",

        image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
    },

    {
        title: "Koramangala Designer Flat",
        location: "Koramangala, Bengaluru",
        specs: "2 Beds · 2 Baths · 1,150 Sq Ft",
        price: "₹52,000 / month",

        image:
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85"
    }

];


/* ================= FEATURED PROPERTY RENDER ================= */

const propertyGrid =
    document.getElementById("propertyGrid");


if (propertyGrid) {

    propertyGrid.innerHTML =
        propertyData.map(property => {

            return `

                <article class="property-card">

                    <div
                        class="property-img"
                        style="background-image:url('${property.image}')">

                        <span class="badge">
                            ${property.status}
                        </span>

                        <button
                            class="heart"
                            aria-label="Save property">

                            ♡

                        </button>

                    </div>

                    <div class="property-body">

                        <h3>
                            ${property.title}
                        </h3>

                        <div class="location">
                            ⌖ ${property.location}
                        </div>

                        <div class="specs">

                            ${property.specs
                                .split(" · ")
                                .map(
                                    spec =>
                                        `<span>${spec}</span>`
                                )
                                .join("")
                            }

                        </div>

                        <div class="price">
                            ${property.price}
                        </div>

                    </div>

                </article>

            `;

        }).join("");

}


/* ================= RENTAL SLIDER ================= */

const rentalTrack =
    document.getElementById("rentalTrack");


if (rentalTrack) {

    rentalTrack.innerHTML =
        rentals.map(property => {

            return `

                <article class="rental-card">

                    <div
                        class="property-img"
                        style="background-image:url('${property.image}')">

                        <span class="badge">
                            For Rent
                        </span>

                    </div>

                    <div class="rent-meta">

                        <small>
                            ${property.location}
                        </small>

                        <small>
                            ✓ Verified
                        </small>

                    </div>

                    <div class="rent-body">

                        <h3>
                            ${property.title}
                        </h3>

                        <p class="location">
                            ${property.specs}
                        </p>

                        <div class="rent-price">
                            ${property.price}
                        </div>

                    </div>

                </article>

            `;

        }).join("");

}


/* ================= RENTAL SLIDER BUTTONS ================= */

const rentPrev =
    document.getElementById("rentPrev");

const rentNext =
    document.getElementById("rentNext");


if (rentPrev && rentalTrack) {

    rentPrev.addEventListener("click", () => {

        rentalTrack.scrollBy({

            left: -360,

            behavior: "smooth"

        });

    });

}


if (rentNext && rentalTrack) {

    rentNext.addEventListener("click", () => {

        rentalTrack.scrollBy({

            left: 360,

            behavior: "smooth"

        });

    });

}


/* =====================================================
   SUBTLE 3D PROPERTY CARD TILT
===================================================== */

function enable3DTilt() {

    const cards =
        document.querySelectorAll(
            ".property-card, .rental-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                /*
                    Disable the stronger tilt on
                    touch/mobile devices.
                */

                if (
                    window.innerWidth <= 700
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) * -2;


                const rotateY =
                    ((x - centerX) /
                        centerX) * 2;


                card.style.transform =
                    `
                    translateY(-10px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.01)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/*
    Run AFTER the property cards have
    been generated.
*/

enable3DTilt();



/* ================= BUY / RENT / SELL TABS ================= */

const searchTabs =
    document.querySelectorAll(".search-tab");


searchTabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            searchTabs.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            tab.classList.add("active");


            const mode =
                tab.dataset.mode;


            const searchMessage =
                document.getElementById(
                    "searchMessage"
                );


            if (!searchMessage) {
                return;
            }


            if (mode === "rent") {

                searchMessage.textContent =
                    "Rental search selected — browse the rental homes below.";

            }

            else if (mode === "sell") {

                searchMessage.textContent =
                    "Selling a property? Submit your details in the enquiry section.";

            }

            else {

                searchMessage.textContent =
                    "Buy search selected — choose your preferences and search.";

            }

        }
    );

});



/* ================= SEARCH BUTTON ================= */

const searchBtn =
    document.getElementById("searchBtn");


if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        () => {

            const activeTab =
                document.querySelector(
                    ".search-tab.active"
                );


            if (!activeTab) {
                return;
            }


            const mode =
                activeTab.dataset.mode;


            const location =
                document.getElementById(
                    "location"
                )?.value;


            const type =
                document.getElementById(
                    "type"
                )?.value;


            const budget =
                document.getElementById(
                    "budget"
                )?.value;


            const message =
                document.getElementById(
                    "searchMessage"
                );


            if (message) {

                message.textContent =
                    `Showing ${mode} options in ${location} · ${type} · ${budget}.`;

            }


            if (mode === "rent") {

                document
                    .getElementById("rent")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }

            else {

                document
                    .getElementById("properties")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }

        }
    );

}



/* ================= LOCATION AREA BUTTONS ================= */

const areaButtons =
    document.querySelectorAll(".area");


areaButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            areaButtons.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );

        }
    );

});



/* ================= HEART / SAVE PROPERTY ================= */

function addHeartListeners() {

    document
        .querySelectorAll(".heart")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    if (
                        button.textContent.trim()
                        === "♡"
                    ) {

                        button.textContent =
                            "♥";

                        button.setAttribute(
                            "aria-label",
                            "Remove saved property"
                        );

                    }

                    else {

                        button.textContent =
                            "♡";

                        button.setAttribute(
                            "aria-label",
                            "Save property"
                        );

                    }

                }
            );

        });

}


addHeartListeners();



/* ================= ENQUIRY FORM ================= */

const enquiryForm =
    document.getElementById(
        "enquiryForm"
    );


if (enquiryForm) {

    enquiryForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formMessage =
                document.getElementById(
                    "formMessage"
                );


            if (formMessage) {

                formMessage.textContent =
                    "Thank you — your enquiry has been received. ESTARA will contact you soon.";

            }


            enquiryForm.reset();

        }
    );

}



/* ================= MOBILE MENU ================= */

const menuBtn =
    document.getElementById(
        "menuBtn"
    );


const nav =
    document.getElementById(
        "nav"
    );


if (menuBtn && nav) {

    menuBtn.addEventListener(
        "click",
        () => {

            nav.classList.toggle(
                "open"
            );

        }
    );


    nav.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove(
                        "open"
                    );

                }
            );

        });

}



/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav a"
    );


window.addEventListener(
    "scroll",
    () => {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 120;


            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.getAttribute(
                        "id"
                    );

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute(
                    "href"
                );


            if (
                href ===
                "#" + currentSection
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);



/* ================= HERO MOUSE DEPTH ================= */

const hero =
    document.querySelector(".hero");


const heroContent =
    document.querySelector(".hero-content");


if (hero && heroContent) {

    hero.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth <= 700
            ) {
                return;
            }


            const rect =
                hero.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const moveX =
                ((x / rect.width) - 0.5) * 8;


            const moveY =
                ((y / rect.height) - 0.5) * 5;


            heroContent.style.transform =
                `
                translateZ(30px)
                translate(${moveX}px, ${moveY}px)
                `;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            heroContent.style.transform =
                "translateZ(30px)";

        }
    );

}