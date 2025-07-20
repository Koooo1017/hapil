import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import quotesData from '../data/quotes.json';
import logo from '../assets/hapil_logo.png';

// 색상 테마 상수
const theme = {
  primary: '#4A4A4A',
  secondary: '#7A7A7A',
  background: '#F8F8F8',
  card: '#FFFFFF',
  accent: '#6B4E71',
  shadow: 'rgba(107, 78, 113, 0.1)'
};

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: ${theme.background};
  font-family: 'Noto Serif KR', serif;
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  
  img {
    height: 40px;
    width: auto;
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: ${theme.primary};
  margin: 0;
  font-weight: 500;
  text-align: center;
`;

const QuoteContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuoteCard = styled(motion.div)`
  background: ${theme.card};
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 20px ${theme.shadow};
  max-width: 600px;
  width: 90%;
  margin: 2rem auto;
  position: relative;
  cursor: grab;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 12px 24px ${theme.shadow};
  }
`;

const QuoteText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${theme.primary};
  white-space: pre-line;
  margin-bottom: 2rem;
  letter-spacing: 0.02em;
`;

const QuoteSource = styled.div`
  font-size: 0.95rem;
  color: ${theme.secondary};
  text-align: right;
  font-weight: 500;
`;

const ArrowIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: currentColor;
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 1rem;
  color: ${theme.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: 0.6;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;

  &:hover {
    opacity: 1;
    transform: translateY(-50%) scale(1.1);
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  &.left {
    left: -20px;
  }

  &.right {
    right: -20px;
  }

  @media (max-width: 768px) {
    &.left {
      left: -10px;
    }

    &.right {
      right: -10px;
    }
  }
`;

const RefreshButton = styled.button`
  background: ${theme.accent};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  margin-top: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px ${theme.shadow};

  &:hover {
    background: #5D4361;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${theme.shadow};
  }

  &:active {
    transform: translateY(0);
  }
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: ${theme.card};
  text-align: center;
  font-size: 0.9rem;
  color: ${theme.secondary};
  box-shadow: 0 -4px 12px ${theme.shadow};
  border-top: 1px solid rgba(107, 78, 113, 0.05);
`;

const MainPage: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(quotesData[0]);
  const [direction, setDirection] = useState(0);

  const getRandomQuote = () => {
    const quotes = quotesData;
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(newQuote);
  };

  const handleNavigation = (dir: number) => {
    setDirection(dir);
    getRandomQuote();
  };

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      setDirection(1);
      getRandomQuote();
    } else if (info.offset.x < -100) {
      setDirection(-1);
      getRandomQuote();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <MainContainer>
      <LogoContainer>
        <img src={logo} alt="하필 로고" />
        <Title>잠들기 전, 오늘 하필...</Title>
      </LogoContainer>
      <QuoteContainer>
        <NavigationButton 
          className="left"
          onClick={() => handleNavigation(-1)}
          aria-label="이전 문장"
        >
          <ArrowIcon viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </ArrowIcon>
        </NavigationButton>
        <AnimatePresence initial={false} custom={direction}>
          <QuoteCard
            key={currentQuote.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
          >
            <QuoteText>{currentQuote.text}</QuoteText>
            <QuoteSource>
              {currentQuote.book} - {currentQuote.author}
            </QuoteSource>
          </QuoteCard>
        </AnimatePresence>
        <NavigationButton 
          className="right"
          onClick={() => handleNavigation(1)}
          aria-label="다음 문장"
        >
          <ArrowIcon viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </ArrowIcon>
        </NavigationButton>
      </QuoteContainer>
      <RefreshButton onClick={getRandomQuote}>
        다른 문장 보기
      </RefreshButton>
      <Footer>
        잠들기 전, 오늘 하필... | {currentQuote.book} | {getCurrentDate()}
      </Footer>
    </MainContainer>
  );
};

export default MainPage; 