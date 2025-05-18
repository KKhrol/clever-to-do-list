import { formatDateToYYYYMMDD } from '@utils/date-formatters';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@context/auth/AuthContext';
import { CalendarProvider } from '@context/calendar/CalendarContext';

import { addUserTask } from '@api/tasks';
import type { CreateTask } from '@api/tasks/dto';

import AddTaskModal from '@components/AddTaskModal';
import StyledTitle from '@components/StyledTitle';

import { CalendarDates } from '../components/CalendarDates';
import type { IDateItemProps } from '../components/CalendarDates/types';
import { HeaderContainer, HomeContainer, TitleWrapper } from './Home.styled';
import AddTaskButton from './components/AddTaskButton';
import HomePageDateItem from './components/HomePageDateItem';

const VisibleDaysCount = 8;
const PaddingHorizontal = 40;
const gap = 30;

const Home = () => {
  const { t } = useTranslation(['common']);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemSize = Math.floor(windowWidth / VisibleDaysCount);
  const today = formatDateToYYYYMMDD(new Date());

  const handleAddTask = useCallback(
    async (task: CreateTask) => {
      if (!user) return;
      await addUserTask(user.uid, {
        ...task,
      });
    },
    [user],
  );

  return (
    <CalendarProvider initialDate={today}>
      <HomeContainer paddingHorizontal={PaddingHorizontal}>
        <HeaderContainer>
          <TitleWrapper>
            <StyledTitle>{t('homePage.title')}</StyledTitle>
          </TitleWrapper>
          <AddTaskButton onClick={() => setModalOpen(true)} />
        </HeaderContainer>
        <CalendarDates
          initialDate={today}
          DateItemComponent={
            HomePageDateItem as React.ComponentType<IDateItemProps>
          }
          height={160}
          itemSize={itemSize}
          width={windowWidth - PaddingHorizontal * 2}
          gap={gap}
        />
        <AddTaskModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddTask}
          mode="add"
        />
      </HomeContainer>
    </CalendarProvider>
  );
};

export default Home;
