import React, { useEffect, useMemo, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import background from "../assets/background.jpeg";
import avtart from "../assets/avtart.jpeg";
import shihada from "../assets/shihada.jpeg";

const Home = () => {
  // Fullscreen certificate modal
  const [selectedImage, setSelectedImage] = useState(null);

  // ---- Fake contact form state (works locally) ----
  const [form, setForm] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    sending: false,
    success: "",
    error: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setStatus({ sending: false, success: "", error: "" });
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = useMemo(() => {
    return (
      form.username.trim().length >= 2 &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.message.trim().length >= 5
    );
  }, [form]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: false, success: "", error: "" });

    if (!isValid) {
      setStatus({
        sending: false,
        success: "",
        error:
          "Please fill all fields correctly (valid email, message 5+ chars).",
      });
      return;
    }

    setStatus({ sending: true, success: "", error: "" });
    await new Promise((r) => setTimeout(r, 900));

    setStatus({
      sending: false,
      success: "Message sent successfully (demo). I’ll get back to you soon.",
      error: "",
    });

    setForm({ username: "", email: "", message: "" });
  };

  // Close modal on ESC + lock scroll
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };

    if (selectedImage) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden"; // lock scroll
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  return (
    <MainContainer>
      <ContentWrapper>
        {/* HERO SECTION */}
        <HeroSection>
          <TextSide>
            <PortfolioTitle>My Portfolio</PortfolioTitle>

            <NameTitle>
              Hassan Ousman <br />
              <DataScientist>Data Scientist</DataScientist>
            </NameTitle>

            <AboutGlass>
              <AboutTitle>About Me</AboutTitle>
              <AboutText>
                I am a Data Scientist driven by the intersection of Deep
                Learning and real-world problem-solving. With a strong
                foundation in Computer Vision and predictive modeling, I
                specialize in building end-to-end AI systems—from designing CNN
                architectures to optimizing models for deployment. My recent
                work focuses on leveraging machine learning to solve localized
                challenges, such as early crop disease detection in Rwanda and
                automated institutional identification systems. I am passionate
                about turning complex datasets into actionable insights that
                drive efficiency and innovation.
              </AboutText>
            </AboutGlass>

            <SkillsGrid>
              <SkillGlass>Python</SkillGlass>
              <SkillGlass>JavaScript</SkillGlass>
              <SkillGlass>HTML & CSS</SkillGlass>
              <SkillGlass>R Programming</SkillGlass>
              <SkillGlass>Tableau</SkillGlass>
            </SkillsGrid>
          </TextSide>

          <ImageSide>
            <ProfileImage src={avtart} alt="Profile" />
          </ImageSide>
        </HeroSection>

        {/* AI SKILLS */}
        <AISection>
          <AIContainer>
            <TitleSide>
              <SectionTitle>
                AI Skills <br /> I Have Mastered
              </SectionTitle>
            </TitleSide>

            <CircleSide>
              <OrbitStage>
                <OrbitTrack aria-hidden="true" />
                <CenterGlow aria-hidden="true" />

                <OrbitingCircle $variant="ml">
                  <CircleGlass $mini>ML</CircleGlass>
                </OrbitingCircle>

                <OrbitingCircle $variant="dl">
                  <CircleGlass $mini>
                    D<Orange>L</Orange>
                  </CircleGlass>
                </OrbitingCircle>
              </OrbitStage>

              <OrbitHint>
                ML & DL cycle animation (they meet at the center)
              </OrbitHint>
            </CircleSide>
          </AIContainer>
        </AISection>

        {/* CERTIFICATES SECTION */}
        <CertificatesSection>
          <CertificateTitleCenter>My Certificates</CertificateTitleCenter>

          <CertificatesGrid>
            <CertificateCard
              role="button"
              tabIndex={0}
              onClick={() => setSelectedImage(shihada)}
              onKeyDown={(e) => e.key === "Enter" && setSelectedImage(shihada)}
            >
              <CertificateImage src={shihada} alt="Internship Certificate" />
              <CertificateTitle>Internship Hassan Ousman</CertificateTitle>
              <CertificateHint>Click to view fullscreen</CertificateHint>
            </CertificateCard>
          </CertificatesGrid>
        </CertificatesSection>

        {/* CONTACT SECTION */}
        <ContactSection>
          <ContactContainer>
            <TitleSide>
              <SectionTitle>
                Contact <br /> Information
              </SectionTitle>
            </TitleSide>

            <FormSide as="form" onSubmit={onSubmit}>
              <GlassInput
                name="username"
                value={form.username}
                onChange={onChange}
                placeholder="Username..."
                autoComplete="name"
              />
              <GlassInput
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="Email..."
                autoComplete="email"
              />
              <GlassTextArea
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Message..."
              />

              <FormActions>
                <SendButton type="submit" disabled={!isValid || status.sending}>
                  {status.sending ? "Sending..." : "Send Message"}
                </SendButton>
                              </FormActions>

              {status.error && <StatusMsg $error>{status.error}</StatusMsg>}
              {status.success && <StatusMsg>{status.success}</StatusMsg>}

              <GlassLink
                href="https://github.com/Hassan-Datascientist"
                target="_blank"
                rel="noreferrer"
              >
                github.com
              </GlassLink>
            </FormSide>

            <InfoSide>
              <InfoGlass>
                <InfoItem>Hassan Ousman Abdoulaye</InfoItem>
                <InfoItem>hassanousman1010@gmail.com</InfoItem>
                <InfoItem>+250 791 957 707</InfoItem>
              </InfoGlass>

              <GlassLink
                href="www.linkedin.com/in/hassan-ousman-1b400233b"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com
              </GlassLink>
            </InfoSide>
          </ContactContainer>
        </ContactSection>
      </ContentWrapper>

      {/* ✅ Single fullscreen modal (only once) */}
      {selectedImage && (
        <ImageModal
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
        >
          <ModalInner onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={() => setSelectedImage(null)} aria-label="Close">
              ✕
            </CloseBtn>

            <ModalImage src={selectedImage} alt="Certificate Full View" />

            <ModalFooter>
              <ModalTip>ESC or click outside to close</ModalTip>
              <DownloadBtn href={selectedImage} download>
                Download
              </DownloadBtn>
            </ModalFooter>
          </ModalInner>
        </ImageModal>
      )}
    </MainContainer>
  );
};

export default Home;

/* ================= ANIMATIONS ================= */

const orbit = keyframes`
  0%   { transform: rotate(0deg) translateX(140px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(140px) rotate(-360deg); }
`;

const centerPulse = keyframes`
  0%, 46%, 54%, 100% { opacity: 0.22; transform: scale(0.9); filter: blur(2px); }
  50% { opacity: 0.95; transform: scale(1.35); filter: blur(0px); }
`;

const touchPulse = keyframes`
  0%, 46%, 54%, 100% { transform: scale(1); }
  50% { transform: scale(1.10); }
`;

const modalFade = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const modalZoom = keyframes`
  from { transform: translateY(20px) scale(0.92); opacity: 0; }
  to   { transform: translateY(0px) scale(1); opacity: 1; }
`;

/* ================= BACKGROUND (FIXED) ================= */

const MainContainer = styled.div`
  position: relative;
  min-height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  color: white;
  overflow: hidden;

  &::before {
    content: "";
    position: fixed;
    inset: 0;
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transform: translateZ(0);
    will-change: transform;
    z-index: -2;
  }

  &::after {
    content: "";
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.22);
    z-index: -1;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 80px;

  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);

  isolation: isolate;
  transform: translateZ(0);

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

/* ================= HERO ================= */

const HeroSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 100px;
  gap: 50px;

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextSide = styled.div`
  flex: 1;
  max-width: 760px;

  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

const ImageSide = styled.div`
  flex: 1;
  max-width: 500px;

  @media (max-width: 1024px) {
    max-width: 100%;
    width: 100%;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 0 50px rgba(255, 255, 255, 0.6);
`;

const PortfolioTitle = styled.h1`
  font-size: 120px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: right;
  background: linear-gradient(90deg, #ffffff, #e38400);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 1024px) {
    text-align: center;
    font-size: 80px;
  }
  @media (max-width: 768px) {
    font-size: 60px;
  }
`;

const NameTitle = styled.div`
  font-size: 80px;
  font-weight: bold;
  margin-bottom: 26px;
  text-align: right;
  background: linear-gradient(90deg, #ffffff, #e38400);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 1024px) {
    text-align: center;
    font-size: 60px;
  }
  @media (max-width: 768px) {
    font-size: 45px;
    margin-bottom: 20px;
  }
`;

const DataScientist = styled.span`
  font-size: 80px;
  font-weight: bold;
  color: #e38400;

  @media (max-width: 1024px) {
    font-size: 60px;
  }
  @media (max-width: 768px) {
    font-size: 45px;
  }
`;

/* About */
const AboutGlass = styled.div`
  margin-left: auto;
  max-width: 720px;
  padding: 28px 32px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow:
    0 0 20px rgba(255, 255, 255, 0.55),
    0 0 45px rgba(255, 255, 255, 0.28),
    0 0 70px rgba(255, 255, 255, 0.2);
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    margin-left: 0;
    text-align: left;
  }
  @media (max-width: 768px) {
    padding: 22px;
    margin-bottom: 28px;
  }
`;

const AboutTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 28px;
  font-weight: 900;
  background: linear-gradient(90deg, #ffffff, #e38400);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const AboutText = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.75;
  font-weight: 650;
  color: rgba(255, 255, 255, 0.88);

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 1.7;
  }
`;

/* Skills */
const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: flex-start;

  @media (max-width: 1024px) {
    justify-content: center;
  }
  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const SkillGlass = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 15px;
  padding: 25px 40px;
  font-weight: bold;
  font-size: 26px;
  text-align: center;
  color: white;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  box-shadow:
    0 0 20px rgba(255, 255, 255, 0.7),
    0 0 40px rgba(255, 255, 255, 0.4),
    0 0 60px rgba(255, 255, 255, 0.3);

  &:hover {
    transform: translateY(-6px);
    box-shadow:
      0 0 25px rgba(255, 255, 255, 0.9),
      0 0 50px rgba(255, 255, 255, 0.6),
      0 0 75px rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    padding: 20px 30px;
    font-size: 20px;
  }
`;

/* ================= AI SKILLS ================= */

const AISection = styled.section`
  margin-bottom: 100px;

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

const AIContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 80px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 50px;
  }
`;

const CircleSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const TitleSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1024px) {
    text-align: center;
    width: 100%;
  }
`;

const SectionTitle = styled.h2`
  font-size: 80px;
  font-weight: bold;
  line-height: 1.2;
  background: linear-gradient(90deg, #ffffff, #e38400);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 1024px) {
    font-size: 60px;
    text-align: center;
  }
  @media (max-width: 768px) {
    font-size: 45px;
  }
`;

const OrbitStage = styled.div`
  position: relative;
  width: 360px;
  height: 360px;
  border-radius: 24px;
  display: grid;
  place-items: center;

  isolation: isolate;
  contain: paint;
  transform: translateZ(0);
  will-change: transform;

  @media (max-width: 768px) {
    width: 280px;
    height: 280px;
  }
`;

const OrbitTrack = styled.div`
  position: absolute;
  inset: 18px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.15);
  background: radial-gradient(
    circle at 50% 50%,
    rgba(227, 132, 0, 0.12),
    rgba(255, 255, 255, 0.04),
    rgba(255, 255, 255, 0)
  );
`;

const CenterGlow = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 999px;
  background: radial-gradient(
    circle,
    rgba(227, 132, 0, 0.55),
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0)
  );
  box-shadow:
    0 0 35px rgba(227, 132, 0, 0.35),
    0 0 70px rgba(255, 255, 255, 0.25);
  animation: ${centerPulse} 2.6s ease-in-out infinite;
`;

const OrbitingCircle = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;

  animation: ${orbit} 2.6s linear infinite;
  will-change: transform;
  transform: translateZ(0);

  & > div {
    animation: ${touchPulse} 2.6s ease-in-out infinite;
    will-change: transform;
  }

  ${(p) =>
    p.$variant === "dl" &&
    css`
      animation-delay: -1.3s;
      & > div {
        animation-delay: -1.3s;
      }
    `}
`;

const OrbitHint = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
`;

const CircleGlass = styled.div`
  width: ${(p) => (p.$mini ? "160px" : "250px")};
  height: ${(p) => (p.$mini ? "160px" : "250px")};
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: ${(p) => (p.$mini ? "42px" : "48px")};
  color: white;
  text-align: center;
  box-shadow:
    0 0 30px rgba(255, 255, 255, 0.9),
    0 0 60px rgba(255, 255, 255, 0.6),
    0 0 100px rgba(255, 255, 255, 0.4);

  @media (max-width: 768px) {
    width: ${(p) => (p.$mini ? "130px" : "180px")};
    height: ${(p) => (p.$mini ? "130px" : "180px")};
    font-size: ${(p) => (p.$mini ? "34px" : "36px")};
  }
`;

const Orange = styled.span`
  color: #e38400;
`;

/* ================= CERTIFICATES ================= */

const CertificatesSection = styled.section`
  margin-bottom: 100px;

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`;

const CertificateTitleCenter = styled.h2`
  font-size: 90px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 80px;
  background: linear-gradient(90deg, #ffffff, #e38400);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 1024px) {
    font-size: 65px;
    margin-bottom: 60px;
  }
  @media (max-width: 768px) {
    font-size: 50px;
    margin-bottom: 40px;
  }
`;

const CertificatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  place-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const CertificateCard = styled.div`
  width: 340px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);

  box-shadow:
    0 0 20px rgba(255, 255, 255, 0.6),
    0 0 40px rgba(255, 255, 255, 0.3);

  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px) scale(1.02);
  }
`;

const CertificateImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
`;

const CertificateTitle = styled.h3`
  padding: 16px 18px 6px;
  margin: 0;
  font-size: 22px;
  text-align: center;
  font-weight: bold;
  background: linear-gradient(90deg, #ffffff, #e38400);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CertificateHint = styled.p`
  margin: 0;
  padding: 0 18px 18px;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
`;

/* ✅ FULLSCREEN MODAL */
const ImageModal = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;

  z-index: 999999;

  display: grid;
  place-items: center;

  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  animation: ${modalFade} 180ms ease-out;
`;

const ModalInner = styled.div`
  width: min(1100px, 92vw);
  height: min(90vh, 740px);
  position: relative;

  border-radius: 22px;
  overflow: hidden;

  background: rgba(255, 255, 255, 0.08);
  box-shadow:
    0 0 40px rgba(255, 255, 255, 0.22),
    0 0 120px rgba(227, 132, 0, 0.18);

  animation: ${modalZoom} 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;

  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.22);

  background: rgba(0, 0, 0, 0.35);
  color: white;

  font-size: 18px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    background: rgba(227, 132, 0, 0.25);
    border-color: rgba(227, 132, 0, 0.35);
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: rgba(0, 0, 0, 0.35);
`;

/* Footer (tip + download) */
const ModalFooter = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 14px 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;

  background: linear-gradient(to top, rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0));
`;

const ModalTip = styled.div`
  font-weight: 800;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;

const DownloadBtn = styled.a`
  text-decoration: none;
  font-weight: 900;
  font-size: 14px;
  color: #0b0b0b;

  padding: 12px 14px;
  border-radius: 14px;

  background: linear-gradient(90deg, #ffffff, #e38400);
  box-shadow: 0 0 22px rgba(255, 255, 255, 0.25);

  &:hover {
    transform: translateY(-1px);
  }
`;

/* ================= CONTACT (keep your existing) ================= */
/* NOTE: keep the rest of your styled components exactly as you already have them
   (ContactSection, ContactContainer, FormSide, InfoSide, GlassInput, GlassTextArea,
    GlassLink, InfoGlass, InfoItem, FormActions, SendButton, FormNote, StatusMsg)
   No changes needed below this point for contact styles.
*/

/* ================= CONTACT ================= */

const ContactSection = styled.section`
  margin-top: 80px;

  @media (max-width: 768px) {
    margin-top: 60px;
  }
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  gap: 50px;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const FormSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const InfoSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const GlassInput = styled.input`
  padding: 20px;
  border-radius: 15px;
  border: none;
  font-size: 20px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow:
    0 0 20px rgba(255, 255, 255, 0.7),
    0 0 40px rgba(255, 255, 255, 0.4),
    0 0 60px rgba(255, 255, 255, 0.3);
  transition: box-shadow 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    box-shadow:
      0 0 25px rgba(255, 255, 255, 0.9),
      0 0 50px rgba(255, 255, 255, 0.6),
      0 0 75px rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    padding: 15px;
    font-size: 18px;
  }
`;

const GlassTextArea = styled.textarea`
  padding: 20px;
  border-radius: 15px;
  border: none;
  height: 150px;
  resize: none;
  font-size: 20px;
  font-family: Arial, sans-serif;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow:
    0 0 20px rgba(255, 255, 255, 0.7),
    0 0 40px rgba(255, 255, 255, 0.4),
    0 0 60px rgba(255, 255, 255, 0.3);
  transition: box-shadow 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    box-shadow:
      0 0 25px rgba(255, 255, 255, 0.9),
      0 0 50px rgba(255, 255, 255, 0.6),
      0 0 75px rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    padding: 15px;
    font-size: 18px;
    height: 120px;
  }
`;

const GlassLink = styled.a`
  color: #e38400;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
  background: rgba(255, 255, 255, 0.12);
  padding: 20px 30px;
  border-radius: 15px;
  display: inline-block;
  text-align: center;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow:
    0 0 20px rgba(255, 255, 255, 0.7),
    0 0 40px rgba(255, 255, 255, 0.4),
    0 0 60px rgba(255, 255, 255, 0.3);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 0 25px rgba(255, 255, 255, 0.9),
      0 0 50px rgba(255, 255, 255, 0.6),
      0 0 75px rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    padding: 15px 25px;
    font-size: 18px;
  }
`;

const InfoGlass = styled.div`
  background: rgba(255, 255, 255, 0.12);
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow:
    0 0 20px rgba(255, 255, 255, 0.7),
    0 0 40px rgba(255, 255, 255, 0.4),
    0 0 60px rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const InfoItem = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

/* ----- Form button + messages ----- */

const FormActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SendButton = styled.button`
  border: none;
  cursor: pointer;
  font-weight: 900;
  font-size: 20px;
  padding: 18px 26px;
  border-radius: 15px;

  color: #0b0b0b;
  background: linear-gradient(90deg, #ffffff, #e38400);
  box-shadow:
    0 0 20px rgba(255, 255, 255, 0.55),
    0 0 40px rgba(227, 132, 0, 0.25);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    opacity 0.25s ease;

  &:hover:enabled {
    transform: translateY(-4px);
    box-shadow:
      0 0 25px rgba(255, 255, 255, 0.7),
      0 0 55px rgba(227, 132, 0, 0.35);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const FormNote = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.75);
`;

const StatusMsg = styled.div`
  padding: 14px 16px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 14px;
  line-height: 1.35;

  color: ${(p) => (p.$error ? "#ffd1d1" : "#d9ffe8")};
  background: ${(p) =>
    p.$error ? "rgba(255, 40, 40, 0.18)" : "rgba(20, 255, 140, 0.14)"};

  border: 1px solid
    ${(p) =>
      p.$error ? "rgba(255, 100, 100, 0.25)" : "rgba(100, 255, 190, 0.22)"};

  box-shadow: 0 0 22px rgba(255, 255, 255, 0.14);
`;
