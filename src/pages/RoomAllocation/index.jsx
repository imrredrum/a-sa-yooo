import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Room from "../../components/Room";
import { ROOM_MAXIMUM } from "../../constants";

const Container = styled.section`
  width: 100%;
  max-width: 420px;
  padding: 16px 8px;
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
`;

const Title = styled.div`
  font-weight: 700;
`;

const Reminder = styled.div`
  font-size: 14px;
  border: 1px solid #e5f6fb;
  border-radius: 4px;
  background-color: #f1fdff;
  padding: 12px;
`;

function RoomAllocation({ guest = 0, room = 0, onChange = () => {} }) {
  const [plans, setPlans] = useState(
    Array.from(new Array(room)).map((_x, i) => ({ adult: 1, child: 0, idx: i }))
  );
  const isMounted = useRef(false);

  const handleChange = (idx, key, value) => {
    setPlans((ps) =>
      ps.map((p, i) => {
        if (i === idx) return { ...p, [key]: Number(value) };
        return p;
      })
    );
  };

  const arranged = plans.reduce((acc, cur) => acc + cur.adult + cur.child, 0);

  useEffect(() => {
    if (isMounted.current) {
      onChange(plans.map(({ adult, child }) => ({ adult, child })));
    } else {
      isMounted.current = true;
    }
  }, [plans]);

  useEffect(() => {
    setPlans(
      Array.from(new Array(room)).map((_x, i) => ({
        adult: 1,
        child: 0,
        idx: i,
      }))
    );
  }, [guest, room]);

  let renderBody;

  if (room <= 0) {
    renderBody = <Reminder>未選擇房間數</Reminder>;
  } else if (guest < room) {
    renderBody = <Reminder>房間數過多，請重新確認</Reminder>;
  } else if (guest > room * ROOM_MAXIMUM) {
    renderBody = <Reminder>房間數不足，請重新確認</Reminder>;
  } else {
    renderBody = (
      <>
        {guest > arranged && (
          <Reminder>
            尚未分配人數：
            {guest - arranged} 人
          </Reminder>
        )}
        {plans.map(({ adult, child, idx }) => (
          <Room
            key={idx}
            {...{
              idx,
              adult,
              child,
              disabled: room >= guest,
              left: guest - arranged,
              handleChange,
            }}
          />
        ))}
      </>
    );
  }

  return (
    <Container>
      <Title>
        住客人數：
        {guest} 人 / {room} 房
      </Title>
      {renderBody}
    </Container>
  );
}

export default RoomAllocation;
