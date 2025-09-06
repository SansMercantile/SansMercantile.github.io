document.addEventListener('DOMContentLoaded', () => {
    // A complete list of your blog posts in the desired order
    const allPosts = [
        '/blogs/redefining-risk.html',
        '/blogs/blog-ai-revolution.html',
        '/blogs/blog-human-edge.html',
        '/blogs/blog-compliance-framework.html'
    ];

    const currentPage = window.location.pathname;
    const currentIndex = allPosts.indexOf(currentPage);

    const prevButton = document.getElementById('prevArticleBtn');
    const nextButton = document.getElementById('nextArticleBtn');

    // Function to navigate to the next or previous post
    function navigateToPost(direction) {
        if (currentIndex !== -1) {
            const newIndex = currentIndex + direction;
            if (newIndex >= 0 && newIndex < allPosts.length) {
                window.location.href = allPosts[newIndex];
            }
        }
    }

    // --- 1. Button Navigation Logic ---
    if (currentIndex !== -1) {
        // Handle the "Previous Post" button
        if (prevButton) {
            if (currentIndex === 0) {
                prevButton.style.display = 'none'; // Hide on the first post
            } else {
                prevButton.href = allPosts[currentIndex - 1];
            }
        }
        // Handle the "Next Post" button
        if (nextButton) {
            if (currentIndex === allPosts.length - 1) {
                nextButton.style.display = 'none'; // Hide on the last post
            } else {
                nextButton.href = allPosts[currentIndex + 1];
            }
        }
    }


    // --- 2. Mobile Swipe Navigation Logic ---
    let touchstartX = 0;
    let touchendX = 0;
    const swipeThreshold = 50; // Minimum distance (in pixels) to register as a swipe

    const articleBody = document.querySelector('article'); // The main content area to swipe on

    if (articleBody) {
        articleBody.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        }, { passive: true });

        articleBody.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        // Swipe Left (to go to the next post)
        if (touchendX < touchstartX - swipeThreshold) {
            navigateToPost(1); // 1 for next
        }

        // Swipe Right (to go to the previous post)
        if (touchendX > touchstartX + swipeThreshold) {
            navigateToPost(-1); // -1 for previous
        }
    }
});
