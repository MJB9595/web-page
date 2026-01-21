document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.icon-menu');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    const navItems = document.querySelectorAll('.nav-item'); 
    
    let isSidebarOpen = window.innerWidth > 768; 

    //사이드바 토글 버튼
    menuBtn.addEventListener('click', function() {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            sidebar.classList.toggle('active');
        } else {
            sidebar.classList.toggle('desktop-closed');
            mainContent.classList.toggle('desktop-expanded');
        }
    });

    //화면 리사이즈 처리
    window.addEventListener('resize', function() {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            sidebar.classList.remove('desktop-closed');
            mainContent.classList.remove('desktop-expanded');
            
            mainContent.style.marginLeft = '0'; 
            sidebar.style.display = ''; 
        } else {
            sidebar.classList.remove('active');
            
            sidebar.style.display = '';
            mainContent.style.marginLeft = ''; 
        }
    });

    //네비게이션 클릭 이벤트 
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // 모바일 환경 메뉴 클릭 시 사이드바 닫기
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const keyword = searchInput.value.trim();
            
            if (!keyword) {
                alert('검색어를 입력해주세요.');
                return;
            }

            const contentElements = document.querySelectorAll('.main-content h1, .main-content h2, .main-content h3, .main-content h4, .main-content p, .main-content li, .project-tag');
            
            let found = false;

            // 기존 하이라이트 효과 초기화
            contentElements.forEach(el => el.classList.remove('search-highlight'));

            // 요소들을 순회하며 검색어 찾기
            for (let el of contentElements) {
                if (el.textContent.toLowerCase().includes(keyword.toLowerCase())) {
                    
                    const yOffset = -100; 
                    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

                     window.scrollTo({top: y, behavior: 'smooth'});

                    el.classList.add('search-highlight');
                    
                    setTimeout(() => {
                        el.classList.remove('search-highlight');
                    }, 2000); // 2초 뒤 배경색 복구

                    searchInput.blur();
                    found = true;
                    break;
                }
            }

            if (!found) {
                alert('페이지 내에 해당 검색어가 없습니다.');
            }
        });
    }
});