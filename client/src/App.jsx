import { Route, Router, Routes } from "react-router-dom"
import React, { Component, useContext, useEffect, useState } from "react";
// import { ShepherdTour, ShepherdTourContext } from "react-shepherd";
import About from "./pages/About"
import Profile from "./pages/Profile"
import Signin from "./pages/Signin"
import SignUp from "./pages/Signup"
import Home from "./pages/Home"
import Header from "./components/Header"
import ProtectedRoute from "./components/ProtectedRoute"
import CreateListing from "./pages/CreateListing"
import UpdateListing from './pages/UpdateListing'
import LIsting from "./pages/LIsting"
import Search from "./pages/Search"
// import { steps } from "./steps";
import Shepherd from "shepherd.js"
import 'shepherd.js/dist/css/shepherd.css';




function App() {

  // const [t,set_t]=useState(true)

  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      cancelIcon: {
        enabled: true
      },
      classes: 'custom-tour-class',
      scrollTo: { behavior: 'smooth', block: 'center' }
    }
  });

  const giveTour = () => {

    tour.addStep({
      id: 'intro',
      attachTo: { element:'.title', on: 'bottom' },
     
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Exit',
          type: 'cancel',
          action:tour.cancel
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next',
          action:tour.next
        }
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      highlightClass: 'highlight',
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: 'Welcome to Estate!',
      text: ['Estate is a plateform for providing property dealing and renting services...'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }

    })
    tour.addStep({
      id: '1',
      attachTo: { element:'.search', on: 'bottom' },
     
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Exit',
          type: 'cancel',
          action:tour.cancel
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next',
          action:tour.next
        }
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      highlightClass: 'highlight',
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: 'Search here!',
      // text: ['React-Shepherd is a JavaScript library for guiding users through your React app.'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }

    })

    tour.addStep({
      id: '2',
      attachTo: { element:'.profile', on: 'bottom' },
      beforeShowPromise: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Exit',
          type: 'cancel',
          action:tour.cancel
        },
        {
          classes: 'shepherd-button-secondary',
          text: 'Back',
          type: 'cancel',
          action:tour.back,
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next',
          action:tour.next
        }
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      highlightClass: 'highlight',
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: 'You can see you profile here!!!',
      text: ['On clicking over this ,you will able to make own listiong of peotery and also you can update your profile photo'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }

    })

    tour.addStep({
      id: '3',
      attachTo: { element: '.getstarted', on: 'bottom' },
     
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Exit',
          type: 'cancel',
          action:tour.cancel
        },
        {
          classes: 'shepherd-button-secondary',
          text: 'Back',
          type: 'cancel',
          action:tour.back
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next',
          action:tour.next
        }
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      highlightClass: 'highlight',
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: 'Get Started here!!!',
      text: ['You will see a wide range of property forent as well as sale..'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }

    })

    tour.addStep({
      id: '4',
      attachTo: { element: '.offer', on: 'bottom' },
     
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Exit',
          type: 'cancel',
          action:tour.cancel
        },
        {
          classes: 'shepherd-button-secondary',
          text: 'Back',
          type: 'cancel',
          action:tour.back
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next',
          action:tour.next
        }
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      highlightClass: 'highlight',
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: 'Welcome to React-Shepherd!',
      text: ['React-Shepherd is a JavaScript library for guiding users through your React app.'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }

    })
    tour.addStep({
      id: '5',
      attachTo: { element: '.rent', on: 'bottom' },
     
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Exit',
          type: 'cancel',
          action:tour.cancel
        },
        {
          classes: 'shepherd-button-secondary',
          text: 'Back',
          type: 'cancel',
          action:tour.back
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next',
          action:tour.next
        }
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      highlightClass: 'highlight',
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: 'Welcome to React-Shepherd!',
      text: ['React-Shepherd is a JavaScript library for guiding users through your React app.'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }

    })

    tour.addStep({
      id: '6',
      attachTo: { element:'.sale', on: 'bottom' },
      beforeShowPromise: function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            window.scrollTo(0, 0);
            resolve();
          }, 500);
        });
      },
      buttons: [
        {
          classes: 'shepherd-button-secondary',
          text: 'Exit',
          type: 'cancel',
          action:tour.cancel
        },
        {
          classes: 'shepherd-button-secondary',
          text: 'Back',
          type: 'cancel',
          action:tour.back,
        },
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next',
          action:tour.next
        }
      ],
      classes: 'custom-class-name-1 custom-class-name-2',
      highlightClass: 'highlight',
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: 'Welcome to React-Shepherd!',
      text: ['React-Shepherd is a JavaScript library for guiding users through your React app.'],
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }

    })
    
  

    tour.start()

    
  }

  useEffect(() => {
    giveTour()
  }, [tour])


  return (
    <div >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:listingId" element={<LIsting />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>



    </div>
  )
}

export default App
