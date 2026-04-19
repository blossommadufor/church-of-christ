import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faSpinner,
  faCheckCircle,
  faTimesCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { adminServices } from "../../services/adminServices";

const LocationCaptureModal = ({ isOpen, onClose, onRefresh }) => {
  const [step, setStep] = useState("idle"); // idle, capturing, updating, success, error
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const totalSamples = 30;

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos.coords),
        (err) => {
          let msg = "Failed to get location.";
          if (err.code === 1) msg = "Location permission denied. Please enable it in your browser settings.";
          if (err.code === 2) msg = "Location unavailable. Please check your GPS signal.";
          if (err.code === 3) msg = "Location request timed out.";
          reject(new Error(msg));
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  };

  const startCapture = useCallback(async () => {
    setStep("capturing");
    setProgress(0);
    setError(null);

    let latSum = 0;
    let lngSum = 0;

    try {
      for (let i = 0; i < totalSamples; i++) {
        const coords = await getCurrentPosition();
        latSum += coords.latitude;
        lngSum += coords.longitude;
        setProgress(i + 1);
        
        if (i < totalSamples - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      setStep("updating");
      const finalLat = latSum / totalSamples;
      const finalLng = lngSum / totalSamples;

      await adminServices.updateChurchLocation({
        location: { lat: finalLat, lng: finalLng },
      });

      setStep("success");
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("[Location Capture Error]:", err);
      setError(err.message || "An unexpected error occurred.");
      setStep("error");
    }
  }, [totalSamples, onRefresh]);

  useEffect(() => {
    if (isOpen && step === "idle") {
      startCapture();
    }
  }, [isOpen, step, startCapture]);

  if (!isOpen) return null;

  const handleClose = () => {
    setStep("idle");
    setProgress(0);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={step === "capturing" || step === "updating" ? null : handleClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        {/* Header */}
        <div className="px-8 pt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <FontAwesomeIcon icon={faLocationDot} className="text-primary text-xl" />
            </div>
            <h2 className="text-primary font-bold text-xl">Church Location</h2>
          </div>
          {(step === "success" || step === "error") && (
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 transition"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          {step === "capturing" && (
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
                <div 
                  className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"
                  style={{ animationDuration: '3s' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">{Math.round((progress/totalSamples) * 100)}%</span>
                </div>
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">Capturing Coordinates...</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Please stay still. We are taking {totalSamples} samples to ensure maximum accuracy for the church's attendance geofence.
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-2">
                <div 
                  className="bg-primary h-full transition-all duration-500 ease-out"
                  style={{ width: `${(progress / totalSamples) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Sample {progress} of {totalSamples}
              </p>
            </div>
          )}

          {step === "updating" && (
            <div className="flex flex-col items-center text-center py-10">
              <FontAwesomeIcon icon={faSpinner} className="text-primary text-5xl animate-spin mb-6" />
              <h3 className="text-gray-900 font-bold text-lg mb-2">Processing Data</h3>
              <p className="text-gray-500 text-sm">
                Calculating the mean average and updating our servers...
              </p>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-5xl" />
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-2">Location Updated!</h3>
              <p className="text-gray-500 text-sm mb-8 px-4">
                The church's central coordinates have been successfully calibrated and saved.
              </p>
              <button
                onClick={handleClose}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition shadow-lg shadow-primary/20"
              >
                Back to Dashboard
              </button>
            </div>
          )}

          {step === "error" && (
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-5xl" />
              </div>
              <h3 className="text-gray-900 font-bold text-xl mb-2">Calibrations Failed</h3>
              <p className="text-red-500/80 text-sm mb-8 bg-red-50 p-4 rounded-xl border border-red-100">
                {error}
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleClose}
                  className="flex-1 py-4 border-2 border-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={startCapture}
                  className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition shadow-lg shadow-primary/20"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationCaptureModal;
