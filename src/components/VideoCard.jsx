import { useState } from "react";
import {
  PlayCircle,
  Video,
  X,
  Loader2,
  CheckCircle,
} from "lucide-react";

import SmartImage from "./SmartImage";
import { supabase } from "../lib/supabaseClient";

export default function VideoCard({ video }) {
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);

  const [message, setMessage] = useState("");
  const [accessStatus, setAccessStatus] = useState(null);

  const thumbnail =
    video?.thumbnail_url ||
    video?.thumbnail ||
    "";

  const youtubeUrl =
    video?.youtube_url ||
    video?.youtubeUrl ||
    "";

  // Check whether the user already has approved access
  const checkAccess = async (userEmail) => {
    if (!supabase) {
      setMessage("Supabase is not configured.");
      return false;
    }

    if (!video?.id) {
      setMessage("Video information is missing.");
      return false;
    }

    if (!userEmail?.trim()) {
      return false;
    }

    const normalizedEmail = userEmail.trim().toLowerCase();

    try {
      setChecking(true);

      const { data, error } = await supabase.rpc(
        "check_video_access",
        {
          p_video_id: video.id,
          p_email: normalizedEmail,
        }
      );

      if (error) {
        console.error("Access check error:", error);
        setMessage(error.message);
        return false;
      }

      return data === true;
    } catch (error) {
      console.error("Access check failed:", error);
      setMessage("Unable to check video access.");
      return false;
    } finally {
      setChecking(false);
    }
  };

  // When user clicks the video
  const openRequest = async () => {
    setMessage("");
    setAccessStatus(null);

    const savedEmail = localStorage.getItem(
      "video_access_email"
    );

    // First visit
    if (!savedEmail) {
      setShowModal(true);
      return;
    }

    // Check existing approval
    const approved = await checkAccess(savedEmail);

    if (approved) {
      if (youtubeUrl) {
        window.open(
          youtubeUrl,
          "_blank",
          "noopener,noreferrer"
        );
        return;
      }

      setAccessStatus("approved");

      setMessage(
        "Your access is approved, but this video does not have a YouTube URL yet."
      );

      setShowModal(true);
      return;
    }

    // Not approved
    setEmail(savedEmail);

    setMessage(
      "Your access has not been approved yet. Please wait for admin approval."
    );

    setShowModal(true);
  };

  // Close modal
  const closeRequest = () => {
    if (sending) return;

    setShowModal(false);
    setName("");
    setEmail("");
    setMessage("");
    setAccessStatus(null);
  };

  // Submit request
  const submitRequest = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    if (!video?.id) {
      setMessage("Video information is missing.");
      return;
    }

    if (!supabase) {
      setMessage("Unable to connect to the server.");
      return;
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    setSending(true);

    try {
      // Remember email
      localStorage.setItem(
        "video_access_email",
        normalizedEmail
      );

      // Check if already approved
      const alreadyApproved =
        await checkAccess(normalizedEmail);

      if (alreadyApproved) {
        setAccessStatus("approved");

        if (youtubeUrl) {
          setShowModal(false);

          window.open(
            youtubeUrl,
            "_blank",
            "noopener,noreferrer"
          );

          return;
        }

        setMessage(
          "Your access is approved, but this video does not have a YouTube URL yet."
        );

        return;
      }

      // Create request
      const { error } = await supabase
        .from("video_access_requests")
        .insert({
          video_id: video.id,
          name: name.trim(),
          email: normalizedEmail,
          status: "pending",
        });

      if (error) {
        console.error(
          "Video request error:",
          error
        );

        setMessage(
          `Unable to send request: ${error.message}`
        );

        return;
      }

      setAccessStatus("pending");

      setMessage(
        "Your request has been sent. Please wait for admin approval."
      );

      setName("");
    } catch (error) {
      console.error(error);

      setMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* VIDEO CARD */}

      <button
        type="button"
        onClick={openRequest}
        disabled={checking}
        className="w-full text-left"
        aria-label={`Request access to ${
          video?.title || "video"
        }`}
      >
        <div className="rounded-xl2 overflow-hidden border border-brand-purple/10 bg-white shadow-card hover:-translate-y-1 transition">

          {/* Thumbnail */}

          <div className="relative">
            <SmartImage
              src={thumbnail}
              alt={video?.title || "Video"}
              className="w-full h-44 object-cover"
              icon={Video}
              label={video?.title || "Video"}
            />

            <div className="absolute inset-0 flex items-center justify-center bg-brand-ink/20">
              {checking ? (
                <Loader2
                  className="text-white animate-spin"
                  size={42}
                />
              ) : (
                <PlayCircle
                  className="text-white drop-shadow"
                  size={48}
                />
              )}
            </div>
          </div>

          {/* Content */}

          <div className="p-4">
            <h3 className="font-display font-semibold text-brand-ink">
              {video?.title || "Untitled Video"}
            </h3>

            <p className="mt-1 text-sm text-brand-ink/60">
              {video?.description ||
                "Watch this learning video."}
            </p>

            <p className="mt-3 text-xs font-medium text-brand-purple">
              Click to watch
            </p>
          </div>
        </div>
      </button>

      {/* ACCESS MODAL */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            {/* Header */}

            <div className="flex items-start justify-between gap-4">

              <div>
                <h2 className="text-xl font-semibold text-brand-ink">
                  Request Video Access
                </h2>

                <p className="mt-1 text-sm text-brand-ink/60">
                  {video?.title}
                </p>
              </div>

              <button
                type="button"
                onClick={closeRequest}
                disabled={sending}
                className="text-brand-ink/50 hover:text-brand-ink"
              >
                <X size={20} />
              </button>
            </div>

            {/* Approved */}

            {accessStatus === "approved" ? (
              <div className="mt-6">

                <div className="rounded-lg bg-green-50 p-4 text-green-700">

                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle size={20} />
                    Access Approved
                  </div>

                  <p className="mt-2 text-sm">
                    Your access has been approved.
                  </p>

                </div>

                {youtubeUrl && (
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        youtubeUrl,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    className="btn-primary w-full mt-4"
                  >
                    Watch Video
                  </button>
                )}

              </div>
            ) : (
              /* Request Form */

              <form
                onSubmit={submitRequest}
                className="mt-6 space-y-4"
              >

                {/* Name */}

                <div>
                  <label className="label">
                    Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your name"
                    className="input w-full"
                    required
                  />
                </div>

                {/* Email */}

                <div>
                  <label className="label">
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className="input w-full"
                    required
                  />
                </div>

                {/* Message */}

                {message && (
                  <div className="rounded-lg bg-brand-gradient-soft p-3 text-sm text-brand-ink">
                    {message}
                  </div>
                )}

                {/* Buttons */}

                <div className="flex gap-3 pt-2">

                  <button
                    type="button"
                    onClick={closeRequest}
                    disabled={sending}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary flex-1"
                  >
                    {sending ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                        Sending...
                      </>
                    ) : (
                      "Request Access"
                    )}
                  </button>

                </div>

              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
}