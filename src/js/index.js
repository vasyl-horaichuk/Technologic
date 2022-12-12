/**
 * Smooth Scroll Behavior Polyfill
 */
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

/**
 * Swiper
 */
import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';
Swiper.use([Navigation, Pagination, Thumbs]);

/**
 * noUiSlider 
 */
import noUiSlider from 'nouislider';

/**
 * fslightbox 
 */
import fslightbox from 'fslightbox';

/**
 * simplebar; 
 */
import 'simplebar';

/**
 * Modules
 */
import './modules/popup.js';
import {slideUp, slideDown, slideToggle} from './modules/slideBlock.js';
import mergeRangeSliderTooltips from './modules/mergeRangeSliderTooltips.js';
import './modules/tabs.js';

window.addEventListener("DOMContentLoaded", function () {
    const body = document.querySelector('body'),
          html = document.querySelector('html');

    const toTopTrigger = document.querySelector('.to-top')
    if(toTopTrigger){
        toTopTrigger.addEventListener('click', ()=>{
            body.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        })
    }

    window.addEventListener('scroll', ()=>{
        if(window.scrollY > window.innerHeight && toTopTrigger){
            toTopTrigger.classList.add('visible')
        }
        if(window.scrollY < window.innerHeight && toTopTrigger){
            toTopTrigger.classList.remove('visible')
        }

        const nav = document.querySelector(".nav");
        if(window.scrollY > 100 && nav){
            nav.classList.add('scroll-active')
        }
        if(window.scrollY < 100 && nav){
            nav.classList.remove('scroll-active')
        }

        const productFixedNav = document.querySelector(".product-fixed-nav");
        if(window.scrollY > 200 && productFixedNav){
            productFixedNav.classList.add('active')
        }
        if(window.scrollY < 200 && productFixedNav){
            productFixedNav.classList.remove('active')
        }
    })

    /**
     * Language
     */
    const language = document.querySelectorAll(".header-language");
    language.forEach(block => {
        const checkbox = block.querySelector('input'),
              labels = block.querySelectorAll('span')
        checkbox.addEventListener('change', ()=> {
            labels.forEach(label => label.classList.toggle('active'))
        })
    })

    /**
     * Hide dropdown blocks
     */
    document.addEventListener("click", (e) => {
        const activeBtn = document.querySelector(".dropdown-active");

        if (activeBtn) {
            const parent = activeBtn.parentElement;

            if (parent != e.target && !parent.contains(e.target)) {
                activeBtn.click();
            }
        }
    });

    /**
     * Dropdown Trigger
     */
    const dropdownTriggers = document.querySelectorAll(".dropdown-trigger");
    dropdownTriggers.forEach((trigger) => {
        trigger.addEventListener("click", function () {
            if (
                !trigger.classList.contains("dropdown-active") &&
                document.querySelector(".dropdown-active")
            ) {
                document.querySelector(".dropdown-active").click();
            }

            this.classList.toggle("active");
            this.classList.toggle("dropdown-active");
            this.nextElementSibling.classList.toggle("active");
        });
    });

    /**
     * Nav Search
     */
    const navSearch = document.querySelector(".nav-search");
    if (navSearch) {
        const input = navSearch.querySelector("input"),
            dropdown = navSearch.querySelector(".nav-search--dropdown");

        input.addEventListener("focus", () => {
            navSearch.classList.add("active");
        });

        input.addEventListener("blur", () => {
            setTimeout(() => {
                navSearch.classList.remove("active");
            }, 130);
        });
    }

    /**
     * Nav Catalog Trigger
     */
    const navCatalogTrigger = document.querySelector(".nav-catalog--open");
    if (navCatalogTrigger) {
        const navCatalog = document.querySelector(".nav-catalog");

		document.addEventListener("click", (e) => {
            if (navCatalog.classList.contains("active")) {
                const list = navCatalog.querySelector(".nav-catalog-list");
                const products = navCatalog.querySelector(".nav-catalog-products");

                if (
                    list != e.target &&
                    !list.contains(e.target) &&
                    products != e.target &&
                    !products.contains(e.target) &&
                    navCatalogTrigger != e.target &&
                    !navCatalogTrigger.contains(e.target)
                ) {
                    navCatalog.classList.remove("active");
                }
            }
        });

        navCatalogTrigger.addEventListener("click", function () {
            navCatalog.classList.toggle("active");
        });
    }

	/**
	 * Main Page Hero Catalog
	 */
	const mainPageHeroCatalog = document.querySelector(".main-page-hero-catalog");
	if (mainPageHeroCatalog) {
		const list = mainPageHeroCatalog.querySelector(".main-page-hero-catalog-list");
        const productsCard = mainPageHeroCatalog.querySelectorAll('.main-page-hero-catalog-products')

		mainPageHeroCatalog.addEventListener("mouseenter", function () {
			productsCard.forEach(block => {
                block.style.height = list.offsetHeight + 'px'
            })
		});
	}

	/**
     * Main Hero Slider
     */
    new Swiper('.main-page-hero-slider', {
    	pagination: {
    		el: '.slider-pagination',
    		clickable: true,
    	},
    	navigation: {
    		nextEl: '.swiper-button.-next',
    		prevEl: '.swiper-button.-prev'
    	},
    	simulateTouch: false,
    	spaceBetween: 14,
		slidesPerView: 'auto',
    	breakpoints: {
            992: {
                spaceBetween: 15
            },  
            1550: {
                spaceBetween: 25
            }
    	},
    });

    /**
	 * Mob Nav
	 */
	const mobNav = document.querySelector(".mob-nav");
	if (mobNav) {
        // Open
        const headerBurger = document.querySelector('.header-burger')
        const navBurger = document.querySelector(".nav-burger");

        headerBurger.addEventListener('click', ()=> {
            mobNav.classList.add('active');
            body.classList.add('nav-lock');
    		html.classList.add('nav-lock');
        })

        navBurger.addEventListener('click', ()=> {
            mobNav.classList.add('active');
            body.classList.add('nav-lock');
        })

        // Close 
        const close = mobNav.querySelector('.mob-nav-close')
        close.addEventListener('click', ()=> {
            mobNav.classList.remove('active')
            body.classList.remove('nav-lock');
    		html.classList.remove('nav-lock');
        })

        mobNav.addEventListener('click', function(e){
            if(e.target == mobNav){
                mobNav.classList.remove('active')
                body.classList.remove('nav-lock');
    		    html.classList.remove('nav-lock');
            }
        })

        // Submenu
		const submunuTriggers = mobNav.querySelectorAll(".mob-nav-list-submenu-trgger");
        submunuTriggers.forEach(trigger => {
            trigger.addEventListener("click", ()=> {
                trigger.classList.toggle('active')
                slideToggle(trigger.nextElementSibling)
            });
        })

        // Catalog
        const catalog = mobNav.querySelector('.mob-nav-catalog'),
              openCatalog = mobNav.querySelector('.mob-nav-catalog-trigger'),
              closeCatalog = catalog.querySelector('.mob-nav-catalog--back')

        openCatalog.addEventListener('click', ()=> {
            catalog.classList.add('active')
        })

        closeCatalog.addEventListener('click', ()=> {
            catalog.classList.remove('active')
        })
	}

    /**
	 * Main Products
	 */
	const mainPageProducts = document.querySelectorAll(".main-page-products");
	mainPageProducts.forEach(section => {
		const items = section.querySelector(".main-page-products-items"),
		      more = section.querySelector(".main-page-products-more");

        more.addEventListener("click", function () {
			more.style.display = 'none'
			items.classList.toggle("show-all");
		});

        // Filter
        const filter = section.querySelector(".main-page-products-filter");
        if(filter){
            let isDown = false;
            let startX;
            let scrollLeft;
            
            filter.addEventListener("mousedown", e => {
                isDown = true;
                startX = e.pageX - filter.offsetLeft;
                scrollLeft = filter.scrollLeft;
            });
            filter.addEventListener("mouseleave", () => {
                isDown = false;
            });
            filter.addEventListener("mouseup", () => {
                isDown = false;
            });
            filter.addEventListener("mousemove", e => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - filter.offsetLeft;
                const walk = x - startX;
                filter.scrollLeft = scrollLeft - walk;
            });
        }
	})

	/**
     * Video Reviews
     */
    new Swiper('.video-reviews-slider', {
    	pagination: {
    		el: '.slider-pagination',
    		clickable: true,
    	},
    	simulateTouch: false,
    	spaceBetween: 20,
		slidesPerView: 'auto',
    	breakpoints: {
            992: {
                slidesPerView: 3,
                spaceBetween: 35
            },
            1200: {
                slidesPerView: 4,
            },
    	},
    });

	/**
     * Latest News
     */
    new Swiper('.latest-news-slider', {
    	pagination: {
    		el: '.slider-pagination',
    		clickable: true,
    	},
    	simulateTouch: false,
    	spaceBetween: 10,
		slidesPerView: 'auto',
    	breakpoints: {
            992: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
            1550: {
                slidesPerView: 4,
                spaceBetween: 59
            }
    	},
    });

    /**
	 * Footer Navs
	 */
	const footerNavs = document.querySelectorAll(".footer-nav");
	footerNavs.forEach(nav =>{
        const trigger = nav.querySelector('.footer-nav--title'),
              list = nav.querySelector('.footer-nav--list');

        trigger.addEventListener('click', ()=> {    
            if(window.innerWidth < 768){
                trigger.classList.toggle('active')
                slideToggle(list)
            }
        })
    })

    /**
     * Show Password
     */
    const showPasswordTriggers = document.querySelectorAll('.show-password')
    showPasswordTriggers.forEach(trigger => {
        trigger.addEventListener('click', ()=>{
            const input = trigger.parentElement.querySelector('input')

            if (input.type === "password") {
                input.type = "text";
            } else {
                input.type = "password";
            }

            trigger.classList.toggle('active')
        })
    })

    /**
     * Catalog FAQ
     */
    const catalogFaqItems = document.querySelectorAll('.catalog-faq-item')
    catalogFaqItems.forEach(item => {
        const trigger = item.querySelector('.catalog-faq-item--trigger'),
              dropdown = item.querySelector('.catalog-faq-item--dropdown');

        trigger.addEventListener('click', ()=> {
            item.classList.toggle('active')
            slideToggle(dropdown)
        })
    })

    /**
     * Category FAQ
     */
    const categoryFaqItems = document.querySelectorAll('.category-faq-item')
    categoryFaqItems.forEach(item => {
        const trigger = item.querySelector('.category-faq-item--trigger'),
              dropdown = item.querySelector('.category-faq-item--dropdown');

        trigger.addEventListener('click', ()=> {
            trigger.classList.toggle('active')
            slideToggle(dropdown)
        })
    })

    /**
     * Category Filter
     */
    const categoryFilter = document.querySelector('.category-filter')
    if(categoryFilter){
        // Block Trigger
        const triggers = categoryFilter.querySelectorAll('.category-filter-trigger')
        triggers.forEach(trigger => {
            trigger.addEventListener('click', ()=> {
                trigger.classList.toggle('active')
                slideToggle(trigger.nextElementSibling)
            })
        })

        // Show All Items
        const showAllTriggers = categoryFilter.querySelectorAll('.category-filter-items--show-all')
        showAllTriggers.forEach(trigger => {
            const span = trigger.querySelector('span')

            trigger.addEventListener('click', ()=> {
                if(trigger.classList.contains('active')){
                    span.textContent = 'Показати все'
                    trigger.parentElement.classList.remove('show-all')
                    trigger.classList.remove('active')
                } else {
                    span.textContent = 'Згорнути'
                    trigger.parentElement.classList.add('show-all')
                    trigger.classList.add('active')
                }
            })
        })

        // Range Slider
        const priceSlider = categoryFilter.querySelector('.category-filter-price-slider')
        
        if(priceSlider) {
            noUiSlider.create(priceSlider, {
                start: [50000, 200000],
                connect: true,
                step: 100,
                tooltips: [true, true],
                range: {
                    'min': 0,
                    'max': 250000
                }
            });
            mergeRangeSliderTooltips(priceSlider, 25, ' - ');
        }

        // Mob Triggers
        const categoryOpenTrigger = document.querySelector('.category-filter-open')
        categoryOpenTrigger.addEventListener('click', ()=> {
            categoryFilter.classList.add('active')
        })

        const categoryBackTrigger = categoryFilter.querySelector('.category-filter-back')
        categoryBackTrigger.addEventListener('click', ()=> {
            categoryFilter.classList.remove('active')
        })
    }

    // Product Card
    const productCards = document.querySelectorAll('.product-card')
    productCards.forEach(card => {
        // Details
        const details = card.querySelector('.product-card--details')
        if(details){
            card.addEventListener('mouseenter', ()=> {
                card.style.setProperty('--background-height', 'calc(100% + ' + details.offsetHeight + 'px)')
            })

            card.addEventListener('mouseleave', ()=> {
                card.style.setProperty('--background-height', '100%')
            })
        }

        // Slider
        const slider = card.querySelector('.product-card-slider');
        if(slider){
            let offset = 0;
            let slideIndex = 1;
        
            const slides = slider.querySelectorAll('.product-card--photo'),
                prev = slider.querySelector('.product-card-slider--navigation.-prev'),
                next = slider.querySelector('.product-card-slider--navigation.-next'),
                width = window.getComputedStyle(slider).width,
                slidesField = slider.querySelector('.product-card-slider--inner');
            
            slidesField.style.width = 100 * slides.length + '%';
        
            slides.forEach(slide => {
                slide.style.width = width;
            });
        
            next.addEventListener('click', () => {
        
                if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
                    offset = 0;
                } else {
                    offset += +width.slice(0, width.length - 2); 
                }
        
                slidesField.style.transform = `translateX(-${offset}px)`;
        
                if (slideIndex == slides.length) {
                    slideIndex = 1;
                } else {
                    slideIndex++;
                }
            });
        
            prev.addEventListener('click', () => {
                if (offset == 0) {
                    offset = +width.slice(0, width.length - 2) * (slides.length - 1);
                } else {
                    offset -= +width.slice(0, width.length - 2);
                }
        
                slidesField.style.transform = `translateX(-${offset}px)`;
        
                if (slideIndex == 1) {
                    slideIndex = slides.length;
                } else {
                    slideIndex--;
                }
            });
        }

        // Actions 
        const actionsBtns = card.querySelectorAll('.product-card--actions-button')
        actionsBtns.forEach(btn => {
            btn.addEventListener('click', ()=> {
                btn.classList.toggle('active')
            })
        })
    })

    // Product
    const product = document.querySelector('.product')
    if(product){
        // Tabs 
        const tabsNavs = document.querySelectorAll('.product-tab-nav'),
              tabsContainer = product;

        tabsNavs.forEach(nav => {
            nav.addEventListener('click', function (e) {
                if (e.target.closest('li') && !e.target.classList.contains('active')) {
                    const item = e.target.closest('li'),
                          index = [...nav.children].indexOf(item);
                        
                    tabsNavs.forEach(nav => {
                        nav.querySelector('.active').classList.remove('active');
                        [...nav.children][index].classList.add('active');
                    })

                    const tabs = [...tabsContainer.children];
                    tabsContainer
                        .querySelector(":scope > .product-tab.active")
                        .classList.remove("active");
                    tabs[index].classList.add('active');

                    if(window.scrollY > 150){
                        window.scroll(0, 0)
                    }
                }
            });
        })

        // More
        const moreTriggers = product.querySelectorAll('.product-main-more')
        moreTriggers.forEach(trigger => {
            const triggerText = trigger.querySelector('span'),
                  list = trigger.previousElementSibling

            trigger.addEventListener('click', ()=> {
                if(trigger.classList.contains('active')){
                    triggerText.textContent = trigger.dataset.label
                    list.classList.remove('show-all')
                    trigger.classList.remove('active')
                } else {
                    triggerText.textContent = 'Згорнути'
                    list.classList.add('show-all')
                    trigger.classList.add('active')
                }
            })
        })

        // Gallery
        const thumbs = new Swiper('.product-main-thumbnails', {
            direction: 'vertical',
            // simulateTouch: false,
            slidesPerView: 4,
            spaceBetween: 20,
            watchSlidesProgress: true,
            breakpoints: {
                1550: {
                    spaceBetween: 30,
                    slidesPerView: 5,
                },
            },
        });

        new Swiper('.product-main-slider', {
            pagination: {
                el: '.slider-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button.-next',
                prevEl: '.swiper-button.-prev'
            },
            simulateTouch: false,
            slidesPerView: 1,
            thumbs: {
                swiper: thumbs,
            },
        });

        // Actions
        const actionsBtns = product.querySelectorAll('.product-main-actions--item')
        actionsBtns.forEach(btn => {
            btn.addEventListener('click', ()=> {
                btn.classList.toggle('active')
            })
        })
    }

    // Counter
    const counters = document.querySelectorAll('.product-main-counter')
    counters.forEach(counter => {
        const input = counter.querySelector('input'),
                minus = counter.querySelector('.-minus'),
                plus = counter.querySelector('.-plus')

        input.addEventListener('blur', ()=> {
            if(!input.value || input.value < 1){
                input.value = 1
            }
        })

        minus.addEventListener('click', ()=> {
            if(input.value > 1){
                input.value--
            }
        })
        
        plus.addEventListener('click', ()=> {
            if(input.value < 99){
                input.value++
            }
        })
    })

	/**
     * Product Recommendations
     */
    new Swiper('.product-recommendations-slider', {
    	pagination: {
    		el: '.slider-pagination',
    		clickable: true,
    	},
        navigation: {
    		nextEl: '.swiper-button.-next',
    		prevEl: '.swiper-button.-prev'
    	},
    	simulateTouch: false,
    	spaceBetween: 20,
		slidesPerView: 'auto',
    	breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
            1440: {
                slidesPerView: 5,
            },
    	},
    });

    /**
     * Product Sets
     */
    new Swiper('.product-sets-slider', {
        pagination: {
            el: '.slider-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button.-next',
            prevEl: '.swiper-button.-prev'
        },
        simulateTouch: false,
        spaceBetween: 20,
        slidesPerView: 1,
    });

    /**
     * Leave Feedback Rate
     */
    const rateBlocks = document.querySelectorAll('.rate-js');
    rateBlocks.forEach(wrap =>{
    	const stars = [...wrap.querySelectorAll('.rate-js-star')];
    	let count = 0;

    	wrap.addEventListener('mouseleave', ()=>{
    		stars.forEach(item => item.classList.remove('-hover'))

    		if(count != 0){
    			for(let i = 0; i < count; i++){
    				stars[i].classList.add('-filled')
    			}
    		}
    	})

    	stars.forEach((star, index) => {

    		star.addEventListener('click', ()=>{
    			count = index + 1;
    		})

    		star.addEventListener('mouseenter', ()=>{
    			stars.forEach(item => item.classList.remove('-filled'))
    			stars.forEach(item => item.classList.remove('-hover'))

    			for(let i = 0; i <= index; i++){
    				stars[i].classList.add('-hover')
    			}
    		})
    	})
    })

    /**
     * Personal Area
     */
    const personalArea = document.querySelector('.pa');
    if(personalArea){
        // Orders
        const orders = personalArea.querySelectorAll('.pa-orders-card')
        orders.forEach(card => {
            const trigger = card.querySelector('.pa-orders-card--arrow'),
                  main = card.querySelector('.pa-orders-card-main'),
                  dropdown = card.querySelector('.pa-orders-card-dropdown');

            trigger.addEventListener('click', ()=> {
                main.classList.toggle('active')
                slideToggle(dropdown, 300)
            })
        })

        // Feedbacks
        const feedbacks = personalArea.querySelectorAll('.pa-feedbacks-card')
        feedbacks.forEach(card => {
            const trigger = card.querySelector('.pa-feedbacks-card--arrow'),
                  main = card.querySelector('.pa-feedbacks-card--main'),
                  dropdown = card.querySelector('.pa-feedbacks-card--dropdown');

            
            if(trigger){
                trigger.addEventListener('click', ()=> {
                    main.classList.toggle('active')
                    slideToggle(dropdown, 300)
                })
            }
        })
    }

    /**
     * Checkout
     */
    const checkout = document.querySelector('.checkout')
    if(checkout){
        const deliveryItems = checkout.querySelectorAll('.checkout-delivery--item')
        deliveryItems.forEach(item => {
            const checkbox = item.querySelector('.checkout-checkbox input'),
                  department = item.querySelector('.checkout-delivery-department');

            checkbox.addEventListener('change', ()=>{
                const activeDepartment = checkout.querySelector('.checkout-delivery-department.active')
                
                if(activeDepartment){
                    activeDepartment.classList.remove('active')
                }

                if(department){
                    department.classList.add('active')
                }
            })

            if(department){
                const trigger = department.querySelector('.checkout-delivery-department--trigger'),
                      select = department.querySelector('.checkout-delivery-department--select'),
                      list = department.querySelector('.checkout-delivery-department--list'),
                      listItems = department.querySelectorAll('.checkout-delivery-department--list li')

                trigger.addEventListener('click', ()=>{
                    trigger.style.display = 'none'
                    select.style.display = 'block'
                })

                const input = department.querySelector('.checkout-delivery-department--select input');
                input.addEventListener('focus', ()=>{
                    select.classList.add('active');
                    list.style.display = 'block'
                })
                input.addEventListener('blur', ()=>{
                    setTimeout(() => {
                        select.classList.remove('active');
                        list.style.display = 'none'
                    }, 130);
                })

                listItems.forEach(item => {
                    item.addEventListener('click', ()=> {
                        input.value = item.textContent.trim()
                    })
                })
            }
        })

        const paymentItems = checkout.querySelectorAll('.checkout-payment--item')
        paymentItems.forEach(item => {
            const checkbox = item.querySelector('.checkout-checkbox input'),
                  cards = item.querySelector('.checkout-payment-cards');

            checkbox.addEventListener('change', ()=>{
                const activeCards = checkout.querySelector('.checkout-payment-cards.active')
                
                if(activeCards){
                    activeCards.classList.remove('active')
                }

                if(cards){
                    cards.classList.add('active')
                }
            })
        })
    }

    /**
     * Cart
     */
    const cart = document.querySelector('.popup-cart')
    if(cart){
        const moreTriggers = document.querySelectorAll('.popup-cart-services--more')
        moreTriggers.forEach(trigger => {
            const triggerText = trigger.querySelector('span'),
                  list = trigger.previousElementSibling

            trigger.addEventListener('click', ()=> {
                if(trigger.classList.contains('active')){
                    triggerText.textContent = trigger.dataset.label
                    list.classList.remove('show-all')
                    trigger.classList.remove('active')
                } else {
                    triggerText.textContent = 'Згорнути'
                    list.classList.add('show-all')
                    trigger.classList.add('active')
                }
            })
        })
    }

    /**
     * Map
     */
    const mapSection = document.querySelector('.map')
	if (mapSection) {
        const image = window.innerWidth < 992 ? 'img/icons/map-marker-mob.svg' : 'img/icons/map-marker.svg';
        const myLatlng = new google.maps.LatLng(50.452701, 30.490627);
        const mapOptions = {
            zoom: 16,
            center: myLatlng,
        }
        const map = new google.maps.Map(document.querySelector('#map'), mapOptions);
  
        new google.maps.Marker({
            position: { lat: 50.452701, lng: 30.490627 },
            map,
            icon: image,
        });
	}

    /**
     * Brands Slider
     */
    new Swiper('.brands-slider', {
    	simulateTouch: false,
    	spaceBetween: 20,
        slidesPerView: 'auto',
    	breakpoints: {
            1200: {
    			slidesPerView: 7,
    		},
    		1440: {
    			slidesPerView: 8,
    		},
    	}
    });

    /**
     * Brand Hero Slider
     */
    new Swiper('.brand-hero-slider', {
    	pagination: {
    		el: '.slider-pagination',
    		clickable: true,
    	},
    	simulateTouch: false,
        slidesPerView: 1,
    });

    /**
	 * Blog Mob Nav
	 */
	const blogMobNav = document.querySelector(".blog-mob-nav");
	if (blogMobNav) {
        // Open
        const headerBurger = document.querySelector('.blog-header-burger')

        headerBurger.addEventListener('click', ()=> {
            blogMobNav.classList.add('active');
            body.classList.add('nav-lock');
    		html.classList.add('nav-lock');
        })

        // Close 
        const close = blogMobNav.querySelector('.blog-mob-nav-close')
        close.addEventListener('click', ()=> {
            blogMobNav.classList.remove('active')
            body.classList.remove('nav-lock');
    		html.classList.remove('nav-lock');
        })

        blogMobNav.addEventListener('click', function(e){
            if(e.target == blogMobNav){
                blogMobNav.classList.remove('active')
                body.classList.remove('nav-lock');
    		    html.classList.remove('nav-lock');
            }
        })

        // Dropdowns
		const dropdownTriggers = blogMobNav.querySelectorAll(".blog-mob-nav-trigger");
        dropdownTriggers.forEach(trigger => {
            trigger.addEventListener("click", ()=> {
                trigger.classList.toggle('active')
                slideToggle(trigger.nextElementSibling, 300)
            });
        })

	}

    /**
     * Blog Recommendations Slider
     */
    new Swiper('.blog-recommendations-slider', {
    	simulateTouch: false,
    	spaceBetween: 14,
        slidesPerView: 'auto',
    	breakpoints: {
    		992: {
                slidesPerView: 3,
    		},
    		1200: {
                slidesPerView: 4,
    		},
    	}
    });

    /**
     * Order
     */
    const order = document.querySelector('.order')
    if(order){
        const printTrigger = order.querySelector('.order-print-trigger'),
              downloadTrigger = order.querySelector('.order-download-trigger')

        printTrigger.addEventListener('click', ()=>{
            window.print()
        })

        downloadTrigger.addEventListener('click', ()=>{
            window.print()
        })
    }

    /**
     * Promotion Countdown
     */
    const promotionCountdown = document.querySelector('.promotion-countdown')
    if(promotionCountdown){
        const deadlineDate = '2022-01-01T00:00';

        function getTimeRemaining(date){
            const t = Date.parse(date) - new Date(),
                days = Math.floor(t / 1000 / 60 / 60 / 24),
                hours = Math.floor((t / 1000 / 60 / 60) % 24),
                minutes = Math.floor( (t / 1000 / 60) % 60),
                seconds = Math.floor( (t / 1000) % 60);

            return {
                t, days, hours, minutes, seconds
            }
        }

        function getZero(num){
            if (num >= 0 && num < 10) {
                return '0' + num;
            } else {
                return num;
            }
        }

        const days = promotionCountdown.querySelector('.days'),
            hours = promotionCountdown.querySelector('.hours'),
            minutes = promotionCountdown.querySelector('.minutes'),
            seconds = promotionCountdown.querySelector('.seconds'),
            timerTic = setInterval(updateTimer, 1000);
    
        function updateTimer(){
            const t = getTimeRemaining(deadlineDate);
        
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
        
            if (t.t <= 0) {
                clearInterval(timerTic);
            }
        }

        updateTimer();

    }

    /**
     * Other Promotions Slider
     */
    new Swiper('.other-promotions-slider', {
        pagination: {
            el: '.slider-pagination',
            clickable: true,
        },
        simulateTouch: false,
        slidesPerView: 1,
        spaceBetween: 20,
    	breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
    			slidesPerView: 3,
                spaceBetween: 30,
    		},
    		1440: {
    			slidesPerView: 4,
    		},
    	}
    });
});
