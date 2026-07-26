const API_URL = "https://www.janlekh.com/wp-json/wp/v2/posts?_embed&per_page=6";

async function loadLatestNews() {

    const container = document.getElementById("latestNews");

    container.innerHTML = `
        <div class="text-center text-white">
            <h4>समाचार लोड हो रहे हैं...</h4>
        </div>
    `;

    try {

        const response = await fetch(API_URL);
        const posts = await response.json();

        container.innerHTML = "";

        posts.forEach(post => {

            let image = "assets/images/news-placeholder.jpg";

            if (
                post._embedded &&
                post._embedded["wp:featuredmedia"]
            ) {
                image =
                    post._embedded["wp:featuredmedia"][0].source_url;
            }

            const date = new Date(post.date);

            container.innerHTML += `
                <div class="col-lg-4 col-md-6">

                    <div class="news-card">

                        <img src="${image}" class="img-fluid">

                        <div class="news-content">

                            <span class="news-category">
                                समाचार
                            </span>

                            <h4 class="news-title">
                                ${post.title.rendered}
                            </h4>

                            <p class="news-summary">

                                ${post.excerpt.rendered
                                    .replace(/<[^>]+>/g,"")
                                    .substring(0,120)}...

                            </p>

                            <small>
                                ${date.toLocaleDateString("hi-IN")}
                            </small>

                            <br><br>

                            <a href="${post.link}"
                               target="_blank"
                               class="read-more">

                               पूरा पढ़ें →

                            </a>

                        </div>

                    </div>

                </div>
            `;

        });

    }

    catch(error){

        container.innerHTML = `
            <h3 class="text-center text-danger">
                समाचार लोड नहीं हो सके
            </h3>
        `;

        console.log(error);

    }

}

loadLatestNews();
