$(document).ready(function() {
    const monthNames = ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"];
    const dayNames = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja"];
    
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = date.getDate();

    // Prikaz mjeseca i godine
    $('#calendar-header').append(`<h2>${monthNames[month]} ${year}</h2>`);

    // Prikaz naziva dana u tjednu
    for (let dayName of dayNames) {
        $('#calendar').append(`<div class="dayName">${dayName}</div>`);
    }

    // Dobivanje prvog dana u mjesecu
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Adjust for day names alignment (Monday is the first day, so we need to shift by 1 position)
    const firstDayAdjusted = (firstDay === 0) ? 6 : firstDay - 1;

    // Prikaz praznih dana prije prvog dana u mjesecu
    for (let i = 0; i < firstDayAdjusted; i++) {
        $('#calendar').append('<div class="day empty"></div>');
    }

    // Prikaz dana u mjesecu
    for (let i = 1; i <= daysInMonth; i++) {
        if (i === today) {
            $('#calendar').append(`<div class="day today" data-day="${i}">${i}</div>`);
        } else {
            $('#calendar').append(`<div class="day" data-day="${i}">${i}</div>`);
        }
    }

    $('.day').click(function() {

        // Provjera da li je klik došao s ikone za brisanje
        if ($(event.target).hasClass('delete-note')) {
            return;
        }
        if (!$(this).hasClass('empty')) {
            const day = $(this).data('day');
            $('#note-modal').data('day', day).fadeIn();
        }
    });

    $('.close-button').click(function() {
        $('#note-modal').fadeOut();
    });

    $('#save-note').click(function() {
        const day = $('#note-modal').data('day');
        const noteText = $('#note-text').val().trim();

        if (noteText) {
            $(`.day[data-day="${day}"]`).append(`<div class="note">${noteText}<span class="delete-note">&times;</span></div>`);
            $('#note-text').val('');
            $('#note-modal').fadeOut();
        }
    });

    $(window).click(function(event) {
        if (event.target.id === 'note-modal') {
            $('#note-modal').fadeOut();
        }
    });

    // Dodaj event listener za brisanje bilješki
    $(document).on('click', '.delete-note', function() {
        $(this).parent().remove();
    });
});
