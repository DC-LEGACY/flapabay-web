import LoginModal from "@/components/auth/LoginModal";
import SignupModal from "@/components/auth/SignupModal";
import { Button } from "@/components/ui/button";



const LoginSignupModal = () => {
  return (
    <div className="max-w-6xl mx-auto modal-content rounded-2xl z-50">
      <div className="modal-header">
        <h5 className="font-bold text-lg modal-title" id="exampleModalToggleLabel">
          Welcome to Flapabay
        </h5>
        <Button
          type="button"
          className="btn-close px-2 py-2 hover:bg-flapabay-yellow/20 rounded-2xl"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      {/* End header */}

      <div className="modal-body ">
        <div className="log-reg-form">
          <div className="navtab-style2 justify-center items-center">
            <nav>
              <div className="nav nav-tabs mb20" id="nav-tab" role="tablist">
                <button
                  className="mr-4 nav-link active fw600"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Log in 
                </button>
                <button
                  className="nav-link fw600"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  New Account
                </button>
              </div>
            </nav>
            {/* End nav tab items */}

            <div className="tab-content" id="nav-tabContent2">
              <div
                className="tab-pane fade show active fz15"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <LoginModal />
              </div>
              {/* End signin content */}

              <div
                className="tab-pane fade fz15"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                
                <SignupModal />
              </div>
              {/* End signup content */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupModal;
