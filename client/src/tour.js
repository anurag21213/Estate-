const tour = new Shepherd.Tour({
    // Tour options
    useModalOverlay: true,
    // Options you want to set for all steps
    defaultStepOptions: {
        exitOnEsc: true
    }
  });

  tour.addStep({
    id: 'step1',
    text: 'Users seem to be down by 12.4%. Is that bad?',
    scrollTo: {
        behavior: 'smooth',
        block: 'center'
    },
    attachTo: {
        element: '.getstarted',
        on: 'bottom'
    },
    buttons: [{
        text: 'Next',
        action: tour.next
    }]
});

export default tour
// tour.addStep({
//     id: 'step2',
//     text: 'Income is up by 40%!! I guess the users who left were dead weight.',
//     attachTo: {
//         element: 'body > div.wrapper.d-flex.flex-column.min-vh-100.bg-light > div > div > div:nth-child(1) > div:nth-child(2) > div',
//         on: 'bottom'
//     },
//     buttons: [{
//         text: 'Next, We Scroll!',
//         action: tour.next
//     }]
// });
// tour.addStep({
//     id: 'step3',
//     text: 'Hey! We look at this guys smiling face. Also, notice we scrolled down to come here!',
//     scrollTo: {
//         behavior: 'smooth',
//         block: 'center'
//     },
//     attachTo: {
//         element: 'body > div.wrapper.d-flex.flex-column.min-vh-100.bg-light > div > div > div:nth-child(4) > div > div > div.card-body > div.table-responsive > table > tbody > tr:nth-child(6) > td:nth-child(1) > div > img',
//         on: 'bottom'
//     },
//     buttons: [{
//         text: 'Next',
//         action: tour.next
//     }]
// });
// tour.addStep({
//     id: 'step4',
//     text: 'Now we are going to simulate a user click on this, open up the menu below & then continue.',
//     scrollTo: {
//         behavior: 'smooth',
//         block: 'center'
//     },
//     attachTo: {
//         element: "#sidebar > ul > div.simplebar-wrapper > div.simplebar-mask > div > div > div > li:nth-child(6) > a",
//         on: 'bottom'
//     },
//     buttons: [{
//         text: 'Next',
//         action: tour.next
//     }]
// });
// tour.addStep({
//     id: 'step5',
//     text: 'Here we made this element visible & then showed the step. Cool right?',
//     scrollTo: {
//         behavior: 'smooth',
//         block: 'center'
//     },
//     attachTo: {
//         element: '#sidebar > ul > div.simplebar-wrapper > div.simplebar-mask > div > div > div > li.nav-group.show > ul > li:nth-child(5) > a',
//         on: 'bottom'
//     },
//     beforeShowPromise: function() {
//         return new Promise(function(resolve) {
//             document.querySelector("#sidebar > ul > div.simplebar-wrapper > div.simplebar-mask > div > div > div > li:nth-child(6) > a").click();
//             resolve();
//         });
//     },
//     buttons: [{
//         text: 'Next, We  Go To A New Page!',
//         action: function() {
//             window.location.href = "/base/carousel.html?shtc=t";
//         }
//     }]
// });
  