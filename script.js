$(document).ready(function(){
    
    function loadHistoricalFact(){
        $.ajax({
            url: 'http://numbersapi.com/1/30/date?json',
            method: 'GET',
            dataType: 'json',
            timeout: 5000,
            success: function(data){
                const factText = data.text;
                const factDate = "January 30th";
                
                $('#fun-fact').addClass('loaded').html(`<strong>${factDate}:</strong> ${factText}`);
                
                $('#footer-api-content').html(`
                    <div class="api-fact-text">
                        <i class="fas fa-quote-left text-warning me-2"></i>
                        <span>${factText}</span>
                    </div>
                `);
                
                window.historicalFact ={
                    date: factDate,
                    text: factText,
                    full: `${factDate}: ${factText}`,
                    source: 'Numbers API'
                };
            },
            error: function(){
                const fallbackText = 'Regular exercise can increase your lifespan by up to 7 years and boost your mood naturally!';
                $('#fun-fact').addClass('loaded').html(`<strong>Fitness Fact:</strong> ${fallbackText}`);
                $('#footer-api-content').html(`
                    <div class="api-fact-text">
                        <i class="fas fa-heart text-danger me-2"></i>
                        <span>${fallbackText}</span>
                    </div>
                `);
                
                window.historicalFact ={
                    date: 'Today',
                    text: fallbackText,
                    full: `Fitness Fact: ${fallbackText}`,
                    source: 'Fallback'
                };
            }
        });
    }
    
    loadHistoricalFact();

    function animateCounters(){
        $('.counter').each(function(){
            const $this = $(this);
            const target = parseInt($this.data('target'));
            $({ counter: 0 }).animate({ counter: target },{
                duration: 2000,
                easing: 'swing',
                step: function(){
                    $this.text(Math.ceil(this.counter));
                },
                complete: function(){
                    $this.text(target);
                }
            });
        });
    }

    const statsObserver = new IntersectionObserver((entries) =>{
        entries.forEach(entry =>{
            if (entry.isIntersecting){
                $('.stats-label').css({
                    'opacity': '0',
                    'transform': 'translateX(-50px)'
                }).animate({
                    'opacity': '1'
                },{
                    duration: 500,
                    step: function(now){
                        $(this).css('transform', `translateX(${-50 + (50 * now)}px)`);
                    }
                });
                
                setTimeout(() =>{
                    $('.stats-heading').css({
                        'opacity': '0',
                        'transform': 'translateX(-80px)'
                    }).animate({
                        'opacity': '1'
                    },{
                        duration: 600,
                        step: function(now){
                            $(this).css('transform', `translateX(${-80 + (80 * now)}px)`);
                        }
                    });
                }, 200);
                
                setTimeout(() =>{
                    $('.stat-left').css({
                        'opacity': '0',
                        'transform': 'translateX(-200px)'
                    }).animate({
                        'opacity': '1'
                    },{
                        duration: 600,
                        step: function(now){
                            $(this).css('transform', `translateX(${-200 + (200 * now)}px)`);
                        }
                    });
                }, 400);
                
                setTimeout(() =>{
                    $('.stat-right').css({
                        'opacity': '0',
                        'transform': 'translateX(-250px)'
                    }).animate({
                        'opacity': '1'
                    },{
                        duration: 600,
                        step: function(now){
                            $(this).css('transform', `translateX(${-250 + (250 * now)}px)`);
                        }
                    });
                }, 600);
                
                setTimeout(() =>{
                    $('.stat-center').css({
                        'opacity': '0',
                        'transform': 'translateX(-150px) translateX(-50%)'
                    }).animate({
                        'opacity': '1'
                    },{
                        duration: 600,
                        step: function(now){
                            $(this).css('transform', `translateX(${-150 + (150 * now)}px) translateX(-50%)`);
                        },
                        complete: function(){
                            animateCounters();
                        }
                    });
                }, 800);
                
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection){
        statsObserver.observe(statsSection);
    }
    function initFactSection(){
        const factObserver = new IntersectionObserver((entries) =>{
            entries.forEach(entry =>{
                if (entry.isIntersecting){
                    $('.fact-section .container').css({
                        'opacity': '0',
                        'transform': 'translateX(100px)'
                    }).animate({
                        'opacity': '1'
                    },{
                        duration: 800,
                        easing: 'swing',
                        step: function(now){
                            $(this).css('transform', `translateX(${100 - (100 * now)}px)`);
                        },
                        complete: function(){
                            startBulbPulse();
                            $('#fun-fact').addClass('loaded');
                        }
                    });
                    
                    factObserver.unobserve(entry.target);
                }
            });
        });
        
        const factSection = document.querySelector('.fact-section');
        if (factSection){
            factObserver.observe(factSection);
        }
    }

    function startBulbPulse(){
        function pulse(){
            $('.fact-icon-wrapper').animate({
                'transform': 'scale(1.1)'
            }, 1000, 'swing').animate({
                'transform': 'scale(1)'
            }, 1000, 'swing', pulse);
        }
        pulse();
    }
    
    initFactSection();

    $('.fact-icon-wrapper').on('click', function(){
        const $this = $(this);
        
        $this.stop(true, false).animate({
            'transform': 'scale(1.3)'
        }, 200, 'swing').animate({
            'transform': 'scale(1)'
        }, 200, 'swing', function(){
            startBulbPulse();
        });
        
        setTimeout(() =>{
            loadHistoricalFact();
        }, 300);
    });

    const uploadArea = $('#uploadArea');
    const fileInput = $('#fileInput');
    const uploadStatus = $('#uploadStatus');
    const uploadedImages = $('#uploadedImages');
    const uploadGallery = $('.uploaded-gallery');
    
    uploadArea.on('mouseenter', function(){
        $(this).animate({
            'transform': 'scale(1.02)'
        }, 200);
    });
    
    uploadArea.on('mouseleave', function(){
        $(this).animate({
            'transform': 'scale(1)'
        }, 200);
    });

    uploadArea.on('dragenter', function(e){
        e.preventDefault();
        e.stopPropagation();
        
        $(this).addClass('dragover').animate({
            'border-width': '4px'
        }, 200);
        
        $('.upload-icon').animate({
            'transform': 'scale(1.2) rotate(10deg)'
        }, 300);
    });

    uploadArea.on('dragover', function(e){
        e.preventDefault();
        e.stopPropagation();
    });

    uploadArea.on('dragleave', function(e){
        e.preventDefault();
        e.stopPropagation();
        
        if (!$(this).is(e.target) && !$(this).has(e.target).length){
            $(this).removeClass('dragover').animate({
                'border-width': '3px'
            }, 200);
            
            $('.upload-icon').animate({
                'transform': 'scale(1) rotate(0deg)'
            }, 300);
        }
    });

    uploadArea.on('drop', function(e){
        e.preventDefault();
        e.stopPropagation();
        
        $(this).removeClass('dragover').animate({
            'border-width': '3px'
        }, 200);
        
        $('.upload-icon').animate({
            'transform': 'scale(1) rotate(0deg)'
        }, 300);
        
        const files = e.originalEvent.dataTransfer.files;
        handleFiles(files);
    });

    fileInput.on('change', function(e){
        const files = this.files;
        if (files && files.length > 0){
            handleFiles(files);
        }
    });

    // Handle file uploads
    function handleFiles(files){
        if (files.length === 0) return;

        const validFiles = [];
        const maxSize = 5 * 1024 * 1024; //5MB
        
        for (let i = 0; i < files.length; i++){
            const file = files[i];
            
            if (!file.type.startsWith('image/')){
                showUploadStatus('error', `${file.name} is not an image file`);
                continue;
            }
            if (file.size > maxSize){
                showUploadStatus('error', `${file.name} is too large (max 5MB)`);
                continue;
            }
            validFiles.push(file);
        }

        if (validFiles.length === 0) return;

        uploadArea.addClass('uploading');
        showUploadStatus('progress', `Uploading ${validFiles.length} file(s)...`);

        const formData = new FormData();
        
        validFiles.forEach(file =>{
            formData.append('images', file);
        });

        $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response){
                uploadArea.removeClass('uploading');
                showUploadStatus('success', `${response.count} file(s) uploaded successfully!`);
                displayUploadedImages(response.files);
                
                setTimeout(() =>{
                    hideUploadStatus();
                }, 4000);
            },
            error: function(xhr){
                uploadArea.removeClass('uploading');
                const errorMsg = xhr.responseJSON ? xhr.responseJSON.error : 'Upload failed';
                showUploadStatus('error', `${errorMsg}`);
                setTimeout(() =>{
                    hideUploadStatus();
                }, 6000);
            }
        });
    }

    function showUploadStatus(type, message){
        const statusClass = `upload-${type}`;
        uploadStatus.html(`
            <div class="${statusClass}">
                <span>${message}</span>
            </div>
        `).addClass('show');
    }

    function hideUploadStatus(){
        uploadStatus.removeClass('show').fadeOut(300, function(){
            $(this).empty().show();
        });
    }
    function displayUploadedImages(filenames){
        if (!uploadGallery.hasClass('show')){
            uploadGallery.addClass('show');
        }
        
        filenames.forEach((filename, index) =>{
            setTimeout(() =>{
                const $imageContainer = $(`
                    <div class="col-md-4 col-sm-6 uploaded-image" style="opacity: 0; transform: translateY(30px) scale(0.8);">
                        <img src="/uploads/${filename}" alt="Uploaded fitness image" class="img-fluid">
                    </div>
                `);
                
                uploadedImages.append($imageContainer);
                
                $imageContainer.animate({
                    'opacity': '1'
                },{
                    duration: 600,
                    easing: 'swing',
                    step: function(now){
                        const scale = 0.8 + (0.2 * now);
                        const translateY = 30 - (30 * now);
                        $(this).css('transform', `translateY(${translateY}px) scale(${scale})`);
                    },
                    complete: function(){
                        $(this).css({
                            'opacity': '1',
                            'transform': 'translateY(0) scale(1)'
                        });
                        
                        $(this).animate({
                            'transform': 'translateY(-5px) scale(1.02)'
                        }, 150).animate({
                            'transform': 'translateY(0) scale(1)'
                        }, 150);
                    }
                });
                
            }, index*200);
        });
    }

    $('a[href^="#"]').on('click', function(e){
        e.preventDefault();
        
        const target = $(this.getAttribute('href'));
        if (target.length){
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    $(window).scroll(function(){
        const scrolled = $(this).scrollTop();
        
        if (scrolled > 50){
            $('.floating-navbar').addClass('scrolled');
        } else{
            $('.floating-navbar').removeClass('scrolled');
        }
        
        const parallax = scrolled * 0.5;
        $('.hero-background').css('transform', `translateY(${parallax}px)`);
    });

    function initProgramAnimations(){
        const programObserver = new IntersectionObserver((entries) =>{
            entries.forEach(entry =>{
                if (entry.isIntersecting){
                    const cards = $('.program-card');
                    
                    cards.each(function(index){
                        const $card = $(this);
                        
                        $card.css({
                            'opacity': '0',
                            'transform': 'translateY(80px) rotateX(-15deg) scale(0.8)'
                        });
                        
                        setTimeout(() =>{
                            $card.animate({
                                'opacity': '1'
                            },{
                                duration: 800,
                                easing: 'swing',
                                step: function(now){
                                    const progress = now;
                                    const translateY = 80 - (80 * progress);
                                    const rotateX = -15 + (15 * progress);
                                    const scale = 0.8 + (0.2 * progress);
                                    
                                    $(this).css('transform', `translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`);
                                },
                                complete: function(){
                                    $(this).css({
                                        'opacity': '1',
                                        'transform': 'translateY(0) rotateX(0deg) scale(1)'
                                    });
                                    
                                    // Add bounce effect
                                    $(this).animate({
                                        'transform': 'translateY(-10px) scale(1.05)'
                                    }, 200).animate({
                                        'transform': 'translateY(0) scale(1)'
                                    }, 200);
                                }
                            });
                        }, index * 200);
                    });
                    
                    programObserver.unobserve(entry.target);
                }
            });
        });
        
        const programsSection = document.querySelector('.programs-section');
        if (programsSection){
            programObserver.observe(programsSection);
        }
    }
    
    $('.program-card').on('mouseenter', function(){
        const $this = $(this);
        const $icon = $this.find('.program-icon');
        $icon.animate({
            'transform': 'scale(1.2) rotateY(360deg)'
        }, 600, 'swing');
        
        $this.animate({
            'transform': 'translateY(-20px) rotateX(8deg) rotateY(8deg) scale(1.03)'
        }, 400, 'swing');
        
    }).on('mouseleave', function(){
        const $this = $(this);
        const $icon = $this.find('.program-icon');
        $icon.animate({
            'transform': 'scale(1) rotateY(0deg)'
        }, 400, 'swing');
        
        $this.animate({
            'transform': 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)'
        }, 400, 'swing');
    });
    
    initProgramAnimations();
});