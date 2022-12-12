const navs = document.querySelectorAll('[data-tabs-nav]');

navs.forEach((nav) => {
    nav.addEventListener('click', function (e) {
        if (e.target.closest('li') && !e.target.classList.contains('active')) {
            const item = e.target.closest('li'),
                  navItems = [...item.parentElement.children],
                  index = navItems.indexOf(item),
                  tabsContainer = document.querySelector(
                    `.${nav.dataset.tabsContainer}`
                  ),
                  tabs = [...tabsContainer.children];

            nav.querySelector('.active').classList.remove('active');
            navItems[index].classList.add('active');

            tabsContainer
                .querySelector(":scope > .tab.active")
                .classList.remove("active");
            tabs[index].classList.add('active');
        }
    });
});
