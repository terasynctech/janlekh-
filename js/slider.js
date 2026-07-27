// ================================
// JANLEKH PREMIUM HERO SLIDER
// ================================

const sliderURL =
"https://www.janlekh.com/wp-json/wp/v2/posts?_embed&per_page=5";

async function loadHeroSlider(){

    const hero = document.getElementById("heroSlider");

    hero.innerHTML = `
        <div style="
        height:90vh;
        display:flex;
        justify-content:center;
        align-items:center;
        color:white;">
            Loading...
        </div>
    `;

    try{

        const response = await fetch(sliderURL);
        const posts = await response.json();

        let slides = "";

        posts.forEach((post,index)=>{

            let image="https://via.placeholder.com/1600x900/111827/C1121F?text=JANLEKH";

            if(post._embedded &&
               post._embedded["wp:featuredmedia"]){

                image =
                post._embedded["wp:featuredmedia"][0].source_url;

            }

            const summary =
            post.excerpt.rendered
            .replace(/<[^>]+>/g,"")
            .substring(0,150);

            slides += `

            <div class="hero-slide"
            style="
            background-image:url('${image}');
            display:${index===0?'flex':'none'};
            ">

                <div class="container">

                    <div class="hero-content">

                        <span class="hero-badge">
                            जनलेख विशेष
                        </span>

                        <h1>
                            ${post.title.rendered}
                        </h1>

                        <p>
                            ${summary}...
                        </p>

                        <a
                        href="${post.link}"
                        target="_blank"
                        class="hero-btn">

                        पूरा पढ़ें →

                        </a>

                    </div>

                </div>

            </div>

            `;

        });

        hero.innerHTML = slides;

        startSlider();

    }

    catch(error){

        console.log(error);

        hero.innerHTML = `
        <div style="
        height:90vh;
        display:flex;
        justify-content:center;
        align-items:center;
        color:white;">
            Unable to load slider
        </div>`;
    }

}

let currentSlide = 0;

function startSlider(){

    const slides =
    document.querySelectorAll(".hero-slide");

    setInterval(()=>{

        slides[currentSlide].style.display="none";

        currentSlide++;

        if(currentSlide>=slides.length){

            currentSlide=0;

        }

        slides[currentSlide].style.display="flex";

    },5000);

}

loadHeroSlider();
