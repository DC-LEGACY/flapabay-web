import React from "react";
import UnsubscribeModal from "./UnsubscribeModal";
import InspirationOffer from "./InspirationOffer";
import Exit from "./Exit";
import Wherelive from "./Wherelive";
import EditLocation from "./EditLocation";
import WheretoGo from "./WheretoGo";
import Aboutyou from "./Aboutyou";
import Searchforplace from "./Searchforplace";
import Addplace from "./Addplace";
import EarlySuccess from "./EarlySuccess";
import Removelisting from "./Removelisting";
import TellGuests from "./TellGuests";
import Deletewishlist from "./Deletewishlist";
import Renamewishlist from "./Renamewhislist";
import Addnote from "./Addnote";
import Feedbacksent from "./Feedbacksent";
import Identityverify from "./Identityverify";
import Aboutplace from "./Aboutplace";

const Unsubscribe = () => {
  return (
    <>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#loginSignupModal"
          role="button"
        >
         
          <span className="d-none d-xl-block">unsubscribe</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <UnsubscribeModal />
          </div>
        </div>
      </div>
     
    </div>


<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#inspiration"
          role="button"
        >
         
          <span className="d-none d-xl-block">Inspiration</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="inspiration"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <InspirationOffer/>
          </div>
        </div>
      </div>
     
    </div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#exit"
          role="button"
        >
         
          <span className="d-none d-xl-block">Exit</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="exit"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <Exit/>
          </div>
        </div>
      </div>
     
    </div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#live"
          role="button"
        >
         
          <span className="d-none d-xl-block">Where Live</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="live"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <Wherelive/>
          </div>
        </div>
      </div>
     
    </div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#location"
          role="button"
        >
         
          <span className="d-none d-xl-block">Edit location</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="location"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <EditLocation/>
          </div>
        </div>
      </div>
     
    </div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#wheretogo"
          role="button"
        >
         
          <span className="d-none d-xl-block">WHERE TO GO</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="wheretogo"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <WheretoGo/>
          </div>
        </div>
      </div>
     
    </div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#aboutyou"
          role="button"
        >
         
          <span className="d-none d-xl-block">About you</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="aboutyou"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <Aboutyou/>
          </div>
        </div>
      </div>
     
    </div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#searchforplace"
          role="button"
        >
         
          <span className="d-none d-xl-block">search for</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="searchforplace"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <Searchforplace/>
          </div>
        </div>
      </div>
     
    </div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#addplace"
          role="button"
        >
         
          <span className="d-none d-xl-block">Add place</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="addplace"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <Addplace/>
          </div>
        </div>
      </div>
     
    </div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#earlysuccess"
          role="button"
        >
         
          <span className="d-none d-xl-block">earlysuccess</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="earlysuccess"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <EarlySuccess/>
          </div>
        </div>
      </div>
     
    </div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#removelisting"
          role="button"
        >
         
          <span className="d-none d-xl-block">removelisting</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="removelisting"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <Removelisting/>
          </div>
        </div>
      </div>
     
    </div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#tellguests"
          role="button"
        >
         
          <span className="d-none d-xl-block">tellguests</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="tellguests"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <TellGuests/>
          </div>
        </div>
      </div>
     
    </div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#deletewishlist"
          role="button"
        >
         
          <span className="d-none d-xl-block">deletewishlist</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="deletewishlist"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <Deletewishlist/>
          </div>
        </div>
      </div>
     
    </div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#Renamewishlist"
          role="button"
        >
         
          <span className="d-none d-xl-block">Renamewishlist</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="Renamewishlist"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <Renamewishlist/>
          </div>
        </div>
      </div>
     
    </div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#Addnote"
          role="button"
        >
         
          <span className="d-none d-xl-block">Addnote</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="Addnote"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <Addnote/>
          </div>
        </div>
      </div>
     
    </div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#Feedbacksent"
          role="button"
        >
         
          <span className="d-none d-xl-block">Feedbacksent</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="Feedbacksent"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <Feedbacksent/>
          </div>
        </div>
      </div>
     
    </div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#Identityverify"
          role="button"
        >
         
          <span className="d-none d-xl-block">Identityverify</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="Identityverify"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <Identityverify/>
          </div>
        </div>
      </div>
     
    </div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div>
        <a
          href="#"
          className="login-info d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#Aboutplace"
          role="button"
        >
         
          <span className="d-none d-xl-block">Aboutplace</span>
        </a>
      </div>

      <div className="signup-modal">
        <div
          className="modal fade"
          id="Aboutplace"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <Aboutplace/>
          </div>
        </div>
      </div>
     
    </div>


    </>

  );
};

export default Unsubscribe;
