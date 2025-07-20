import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from '../assets/hapil_logo.png';

const theme = {
  primary: '#4A4A4A',
  secondary: '#7A7A7A',
  background: '#F8F8F8',
  accent: '#6B4E71',
  shadow: 'rgba(107, 78, 113, 0.1)'
};

const LandingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.background};
  font-family: 'Noto Serif KR', serif;
  padding: 20px;
`;

const LogoContainer = styled(motion.div)`
  text-align: center;
  cursor: pointer;
  
  img {
    width: 80%;
    max-width: 300px;
    height: auto;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    img {
      width: 90%;
      max-width: 250px;
    }
  }
`;

const Description = styled(motion.p)`
  color: ${theme.secondary};
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-top: 2rem;
  max-width: 500px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 20px;
  }
`;

const StartButton = styled(motion.button)`
  background: ${theme.accent};
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 30px;
  font-size: 1.1rem;
  margin-top: 3rem;
  cursor: pointer;
  font-family: inherit;
  box-shadow: 0 4px 12px ${theme.shadow};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${theme.shadow};
  }

  &:active {
    transform: translateY(0);
  }
`;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <LandingContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <LogoContainer
          variants={itemVariants}
          onClick={() => navigate('/main')}
        >
          <img src={logo} alt="하필 로고" />
        </LogoContainer>
        <Description variants={itemVariants}>
          하루의 마지막, 잠들기 전<br />
          문학적 감성으로 채우는 필사의 시간
        </Description>
        <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
          <StartButton onClick={() => navigate('/main')}>
            시작하기
          </StartButton>
        </motion.div>
      </motion.div>
    </LandingContainer>
  );
};

export default LandingPage; 