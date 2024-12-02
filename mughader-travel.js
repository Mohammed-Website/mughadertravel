let lastScrollY = window.scrollY; // Track the last scroll position

// Ensure the header starts visible
const header = document.querySelector("header");
header.classList.add("show");

// Adjust padding to prevent content overlap
document.body.style.paddingTop = `${header.offsetHeight}px`;

// Scroll event to toggle header visibility
window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY) {
        // Scrolling up: Show the header
        header.classList.remove("hide");
        header.classList.add("show");
    } else {
        // Scrolling down: Hide the header
        header.classList.remove("show");
        header.classList.add("hide");
    }

    lastScrollY = currentScrollY; // Update the last scroll position
});






function mughader_toggleSidebar() {
    let sidebar = document.getElementById("mughader_mobile_sidebar");
    let overlay = document.getElementById("mughader_sidebar_overlay");

    if (sidebar.style.right === "0px") {
        mughader_closeSidebar();
    } else {
        sidebar.style.right = "0px"; // Show sidebar
        overlay.classList.add("active"); // Show overlay
    }
}

function mughader_closeSidebar() {
    let sidebar = document.getElementById("mughader_mobile_sidebar");
    let overlay = document.getElementById("mughader_sidebar_overlay");

    sidebar.style.right = "-250px"; // Hide sidebar
    overlay.classList.remove("active"); // Hide overlay
}











/* Switching words functionality */
document.addEventListener("DOMContentLoaded", function () {
    let words = [
        "إندونيسيا",
        "تايلاند",
        "المالديف",
        "موريشيوس",
        "عروض سياحية",
        "جورجيا",
        "تركيا",
        "اذربيجان",
        "البوسنة",
        "سيريلانكا",
        "ماليزيا",
        "دبي",
        "مصر",
        "الجبل الأسود"
    ];

    let currentIndex = 1;
    let dynamicWordElement = document.getElementById("mughader_dynamic_word_switch");
    let lineTimerElement = document.getElementById("mughader_first_page_line_timer_id");

    // Ensure the initial word is visible
    dynamicWordElement.classList.add("visible");

    function changeWord() {
        // Fade out by removing 'visible' class
        dynamicWordElement.classList.remove("visible");

        // Wait for the fade-out animation to complete before switching the word
        setTimeout(() => {
            // Change word
            dynamicWordElement.innerText = words[currentIndex];
            currentIndex = (currentIndex + 1) % words.length;

            // Fade in by adding 'visible' class
            dynamicWordElement.classList.add("visible");
        }, 600); // Match the CSS fade-out duration (0.6s)
    }

    function animateTimer() {
        // Reset the timer to start from the center
        lineTimerElement.style.transition = "none"; // Disable transition for instant reset
        lineTimerElement.style.transform = "scaleX(0)"; // Collapse the line

        // Start the animation after a small delay
        setTimeout(() => {
            lineTimerElement.style.transition = "transform 1.8s linear"; // Smooth scaling transition
            lineTimerElement.style.transform = "scaleX(0.1)"; // Expand the line
        }, 50); // Delay to ensure the transition is applied
    }

    function startSwitchingProcess() {
        changeWord(); // Change the word
        animateTimer(); // Animate the timer
    }

    // Start the loop
    setInterval(startSwitchingProcess, 1800); // Match the timer's animation duration (1.8s)

    // Initialize the first word and timer animation
    animateTimer();
});




















/* Function for all elements when scrolling */
document.addEventListener("DOMContentLoaded", () => {
    let animatedElements = document.querySelectorAll(".mughader_animate_on_scroll");

    let observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    let observerCallback = (entries) => {
        entries.forEach(entry => {
            // Check if the element is intersecting and hasn't been animated before
            if (entry.isIntersecting && !entry.target.classList.contains("animation_done")) {
                entry.target.classList.add("intro_animation", "animation_done");
                entry.target.classList.remove("outro_animation");
            } else if (!entry.isIntersecting && !entry.target.classList.contains("animation_done")) {
                entry.target.classList.remove("intro_animation");
                entry.target.classList.add("outro_animation");
            }
        });
    };

    let observer = new IntersectionObserver(observerCallback, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});








/* Ai bot chat functionality */
document.addEventListener("DOMContentLoaded", () => {
    let chatbotIcon = document.getElementById("mughader_chatbot_icon");
    let chatSidebar = document.getElementById("mughader_chat_sidebar");
    let closeChat = document.getElementById("mughader_close_chat");
    let sendBtn = document.getElementById("mughader_send_btn");
    let messageBar = document.getElementById("mughader_message_bar");
    let messageBox = document.querySelector(".mughader_message_box");
    let chatOverlay = document.getElementById("mughader_chat_overlay");

    let API_URL = "https://api.openai.com/v1/chat/completions";
    let API_KEY = "sk-***76cA";

    /* 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 */

    // Check if the user is on a mobile device
    let isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

    // Open Slider if ai bot icon is clicked
    chatbotIcon.addEventListener("click", () => {
        chatSidebar.classList.add("active");
        chatOverlay.classList.add("active");
    });

    // Close Sidebar if close slider button is clicked
    closeChat.addEventListener("click", () => {
        chatSidebar.classList.remove("active");
        chatOverlay.classList.remove("active");
    });

    // Close Sidebar if Overlay is Clicked
    chatOverlay.addEventListener("click", () => {
        chatSidebar.classList.remove("active");
        chatOverlay.classList.remove("active");
    });

    // Send Message Function
    sendBtn.onclick = function () {
        if (messageBar.value.trim() !== "") {
            let UserTypedMessage = messageBar.value.trim();
            messageBar.value = "";

            let userMessage = `
                <div class="chat message">
                    <span>${UserTypedMessage}</span>
                </div>
            `;

            let botResponse = `
                <div class="chat response">
                    <img src="https://mughader.com/مكتب-سياحي/مكتب-سياحي-حائل.jpg" alt="مكتب سياحي - شركة مغادر" title="مكتب سياحي - شركة مغادر" class="no_full_screen_image">
                    <span class="new">...</span>
                </div>
            `;

            messageBox.insertAdjacentHTML("beforeend", userMessage);

            setTimeout(() => {
                messageBox.insertAdjacentHTML("beforeend", botResponse);

                let requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API_KEY}`
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [{ role: "user", content: UserTypedMessage }]
                    })
                };

                fetch(API_URL, requestOptions)
                    .then((res) => res.json())
                    .then((data) => {
                        let ChatBotResponse = document.querySelector(".response .new");
                        ChatBotResponse.innerHTML = data.choices[0].message.content;
                        ChatBotResponse.classList.remove("new");
                    })
                    .catch(() => {
                        let ChatBotResponse = document.querySelector(".response .new");
                        ChatBotResponse.innerHTML = "الموقع مازال في وضع التجربة";
                    });
            }, 100);



            document.getElementById("mughader_message_bar").style.height = "40px"; // Reset to default height;
        }
    };

    // Attach Send Message Function to Enter Key (for Desktop)
    if (!isMobileDevice) {
        messageBar.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault(); // Prevent default behavior
                sendBtn.click();
            } else if (event.key === "Enter" && event.shiftKey) {
                event.preventDefault(); // Allow Shift+Enter to insert a new line
                let cursorPosition = messageBar.selectionStart;
                messageBar.value =
                    messageBar.value.substring(0, cursorPosition) + "\n" + messageBar.value.substring(cursorPosition);
                messageBar.selectionStart = messageBar.selectionEnd = cursorPosition + 1; // Move cursor to the new line
                messageBar.style.height = "auto"; // Reset height to auto
                messageBar.style.height = `${messageBar.scrollHeight}px`; // Adjust height based on content
            }
        });
    }

    // Enable Enter for New Line Only (for Mobile)
    if (isMobileDevice) {
        messageBar.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent sending the message
                let cursorPosition = messageBar.selectionStart;
                messageBar.value =
                    messageBar.value.substring(0, cursorPosition) + "\n" + messageBar.value.substring(cursorPosition);
                messageBar.selectionStart = messageBar.selectionEnd = cursorPosition + 1; // Move cursor to the new line
                messageBar.style.height = "auto"; // Reset height to auto
                messageBar.style.height = `${messageBar.scrollHeight}px`; // Adjust height based on content
            }
        });
    }

    // Adjust Textarea Height Dynamically
    messageBar.addEventListener("input", function () {
        this.style.height = "auto"; // Reset height to auto
        this.style.height = `${this.scrollHeight}px`; // Set height based on scroll height
    });

    // Handle Dynamic Text Direction
    document.querySelectorAll('.mughader_dynamic_direction_input_class').forEach(input => {
        input.addEventListener('input', function () {
            let firstChar = this.value.trim().charAt(0);

            if (firstChar) {
                // Check if the first character is Arabic
                if (firstChar.match(/[\u0600-\u06FF]/)) {
                    this.style.direction = 'rtl';
                } else {
                    this.style.direction = 'ltr';
                }
            }
        });
    });
});

/* Auto resize textarea element */
document.addEventListener("DOMContentLoaded", function () {
    let messageBar = document.getElementById("mughader_message_bar");

    messageBar.addEventListener("input", function () {
        this.style.height = "auto"; // Reset height to auto
        this.style.height = `${this.scrollHeight}px`; // Set height based on scroll height
    });
});








/* Full screen image mode for all images on the website */
document.addEventListener("DOMContentLoaded", () => {
    // Dynamically create the overlay container
    const overlay = document.createElement("div");
    overlay.id = "mughader_image_overlay";
    overlay.innerHTML = `
        <div class="mughader_overlay_background"></div>
        <img id="mughader_full_screen_image" src="مكتب سياحي - شركة مغادر" alt="مكتب سياحي - شركة مغادر">
    `;
    document.body.appendChild(overlay);

    // Select all images on the website
    const allImages = document.querySelectorAll("img:not(.no_full_screen_image)");
    const fullScreenImage = document.getElementById("mughader_full_screen_image");

    // Function to show the full-screen overlay
    const showOverlay = (src) => {
        fullScreenImage.src = src;
        overlay.classList.add("show");
    };

    // Function to hide the full-screen overlay with a delay
    const hideOverlay = () => {
        overlay.classList.remove("show");
        // Wait for the transition to complete before removing the image source
        setTimeout(() => {
            fullScreenImage.src = "";
        }, 300); // Match the duration of the CSS transition
    };

    // Event listener for each image to open the overlay
    allImages.forEach((img) => {
        img.classList.add("mughader_clickable"); // Optional: Add a class for styling if needed
        img.addEventListener("click", () => showOverlay(img.src));
    });

    // Event listener for overlay click to hide it
    overlay.addEventListener("click", hideOverlay);
});



















let mughader_commentsArray = [
    {
        profileImage: "https://mughader.com/مكتب-للسفر-والسياحة/مكتب-للسفر-والسياحة-3.png",
        personName: "ناصر الهزاع",
        comment: "وكاله مغادر اشكر ابو عبدالرحمن على تعامله معي انا للامانه رحت معاه لكذا دوله يستاهل كل خير ♥️♥️",
        stars: 5
    },
    {
        profileLetter: "H",
        personName: "Hh Oo",
        comment: "شركة محترمة وصادقة ومرضية للعميل وتقدم خدمات مميزة واسعار مناسبة وخدمات مختلفة.",
        stars: 5
    },
    {
        profileLetter: "E",
        personName: "Emanoo Emee",
        comment: "والله الخدمه جدا رائعه و موفره جميع سبل الراحه و الرفاهيه من خدمة حجوزات الفنادق و السائق الخاص خلال الرحله و تنظيم جداول يوميه للرحلات و توفير خدمة مترجم و المطاعم و جميع الاماكن السياحيه عمل جدا عظيم و جبار و السعر كان جدا مناسب شكرا جزيلا 🙏🏻🌹.",
        stars: 5
    },
    {
        profileLetter: "D",
        personName: "Dal8800 دال للعقارات",
        comment: "شكرا مغادرعلى اتقانكم  بالعمل وعلى خدمتكم الجميله بارك الله فيكم وفي جهودكم الى الاعلى بإذن",
        stars: 5
    },
    {
        profileLetter: "أ",
        personName: "احمد الهزاع",
        comment: "وكاله مغادر من افضل الوكالات رحت معهم مرتين جورجيا وماليزيا ترتيبات احسن ما يكون وسواقين محترمين واسعار منافسه لكن للامانه اللي بيروح جورجيا يحتاط من المتسولين فقط.",
        stars: 5
    },
    {
        profileLetter: "F",
        personName: "Fahad Fahad",
        comment: "خدمه خمس نجوم فعلياً من الاستقبال الى التوديع شكراً لاتفي حقكم ❤️",
        stars: 5
    },
    {
        profileLetter: "ح",
        personName: "حامد العنزي",
        comment: "من أرقى الشركات تعامل وصدق ودقة ويهمهم راحت السائح بأدق التفاصيل وعلى تواصل مباشر مع السائح يوميا حتى العودة",
        stars: 5
    },
    {
        profileImage: "https://mughader.com/مكتب-للسفر-والسياحة/مكتب-للسفر-والسياحة-1.png",
        personName: "م.ثامر الغنيمي",
        comment: "شكراً لكم على خدمتكم الجميلة وتعاملكم الاحترافي وبرامجكم المرنة.. 👍🏻",
        stars: 5
    },
    {
        profileLetter: "ن",
        personName: "ناصر الموسى",
        comment: "نشكر وكاله مغادر على جهوده وتمنى له دائم التوفيق و والــــنــــجـــــاح",
        stars: 5
    },
    {
        profileLetter: "H",
        personName: "Hala Abdullah",
        comment: "من افضل واحسن الي تعاملت معهم للامانة ولا غلطة والاسعار حلوه جدا ومعقولة مرا شككككرا  شركة مغادر للسياحة 💛🙏🏻",
        stars: 5
    },
    {
        profileImage: "https://mughader.com/مكتب-للسفر-والسياحة/مكتب-للسفر-والسياحة-2.png",
        personName: "FAISAL ALHAMED",
        comment: "من افضل وكالات السفر التي تتميز بتقديم خدمات فريدة من نوعها لا يمكن ان تجدها في غيرها من الوكالات",
        stars: 5
    },
    {
        profileLetter: "س",
        personName: "سامي الموسى",
        comment: "صراحه مجهود يشكر عليه من وكالة مغادر للسفر والسياحة ومن افضل الشركات الي حريصه علئ ادق التفاصيل شركه تلبي جميع احتيجاتك وعن تجربه اتكلم صراحه تعاملهم جدا راقي بجميع الاماكن والاوقات ❤️❤️",
        stars: 5
    },
];

// Array of vibrant colors
let mughader_profileColors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFC300", "#33FFF2"];

function mughader_generateComments(comments) {
    let commentsSection = document.getElementById("mughader_customers_comments_section_id");

    comments.forEach(({ profileLetter, profileImage, personName, comment, stars }, index) => {
        // Create the main comment card
        let commentCard = document.createElement("div");
        commentCard.className = "mughader_comment_card";

        // Create the profile picture element
        let profilePicture = document.createElement("div");
        profilePicture.className = "mughader_profile_picture";

        if (profileImage) {
            // Use an image if profileImage is provided
            let img = document.createElement("img");
            img.src = profileImage;
            img.alt = `مكتب سياحي - شركة مغادر`;
            img.title = `مكتب سياحي - شركة مغادر`;
            profilePicture.appendChild(img);
        } else if (profileLetter) {
            // Use the profile letter if no image is provided
            profilePicture.textContent = profileLetter;

            // Assign a vibrant color to the profile picture
            let colorIndex = index % mughader_profileColors.length; // Cycle through the colors
            profilePicture.style.backgroundColor = mughader_profileColors[colorIndex];
        }

        // Create the person's name
        let personNameElement = document.createElement("div");
        personNameElement.className = "mughader_person_name";
        personNameElement.textContent = personName;

        // Create the comment text
        let commentText = document.createElement("div");
        commentText.className = "mughader_comment_text";
        commentText.textContent = comment;

        // Create the stars
        let starsElement = document.createElement("div");
        starsElement.className = "mughader_stars";
        starsElement.textContent = "★".repeat(stars);

        // Append all elements to the comment card
        commentCard.appendChild(profilePicture);
        commentCard.appendChild(personNameElement);
        commentCard.appendChild(commentText);
        commentCard.appendChild(starsElement);

        // Append the comment card to the section
        commentsSection.appendChild(commentCard);
    });
}

// Call the function to populate comments
mughader_generateComments(mughader_commentsArray);





























/* Function to trach the first inserted letter in the inputs with the class name of "mughader_dynamic_direction_input_class" to set their direction value */
document.querySelectorAll('.mughader_dynamic_direction_input_class').forEach(input => {
    input.addEventListener('input', function () {
        let firstChar = this.value.trim().charAt(0);

        if (firstChar) {
            // Check if the first character is Arabic
            if (firstChar.match(/[\u0600-\u06FF]/)) {
                this.style.direction = 'rtl';
            } else {
                this.style.direction = 'ltr';
            }
        }
    });
});

/* Insert new click data in the google sheet */
function insertNewClick(columnName) {
    let scriptURL = "https://script.google.com/macros/s/AKfycbyU-p7z3tHF0I1K0GCmjcRG3CaG0NPkGyMPTvhlGPISxwIYrt6ueD7O2iHSza9SPOP3/exec";

    // Trim the column name before passing it
    fetch(`${scriptURL}?columnName=${encodeURIComponent(columnName.trim())}`)
        .then(response => response.text())
        .then(data => console.log("Response:", data))
        .catch(error => console.error("Error:", error));
}

/* Open WhatsApp */
openWhatsAppNumber = function () {

    insertNewClick('mughader');

    let whatsappNumber = "+966533379004";
    let message = encodeURIComponent('سلام عليكم ورحمة الله وبركاته'); // Optional pre-filled message
    let url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank"); // Opens in a new tab
}



// Create and append script for 'Ionicons' Website Icons (Module Script)
let ioniconsModuleScript = document.createElement('script');
ioniconsModuleScript.type = 'module';
ioniconsModuleScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
document.body.appendChild(ioniconsModuleScript);

// Create and append script for 'Ionicons' Website Icons (Module Script)
let ioniconsNomoduleScript = document.createElement('script');
ioniconsNomoduleScript.setAttribute('nomodule', '');
ioniconsNomoduleScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
document.body.appendChild(ioniconsNomoduleScript);


