import React from 'react';
import styled from 'styled-components';
import CustomInputNumber from '../CustomInputNumber';
import { ROOM_MAXIMUM } from '../../constants';

const Container = styled.div`
  padding: 4px 0 8px;

  &:not(:last-of-type) {
    border-bottom: 1px solid #f5f5f5;
  }
`;

const Title = styled.div`
  padding-bottom: 4px;
`;

const List = styled.div`
  width: calc(100% + 8px * 2);
  margin-left: -8px;
  margin-right: -8px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 14px;
`;

const Content = styled.div`
  padding: 8px;
`;

const SubTitle = styled.div`
  color: #9b9b9b;
  font-size: 12px;
`;

function Room({
  idx,
  adult = 1,
  child = 0,
  disabled = false,
  left = 0,
  handleChange,
}) {
  return (
    <Container>
      <Title>
        房間：
        {adult + child}
        {' '}
        人
      </Title>
      <List>
        <Content>
          <div>成人</div>
          <SubTitle>年齡 20+</SubTitle>
        </Content>
        <CustomInputNumber
          min={1}
          max={Math.min(ROOM_MAXIMUM - child, adult + left)}
          step={1}
          name={`Room_${idx + 1}_Adult`}
          value={adult}
          onChange={(e) => {
            handleChange(idx, 'adult', e.target.value);
          }}
          disabled={disabled}
        />
      </List>
      <List>
        <Content>
          <div>小孩</div>
        </Content>
        <CustomInputNumber
          min={0}
          max={Math.min(ROOM_MAXIMUM - adult, child + left)}
          step={1}
          name={`Room_${idx + 1}_Child`}
          value={child}
          onChange={(e) => {
            handleChange(idx, 'child', e.target.value);
          }}
          disabled={disabled}
        />
      </List>
    </Container>
  );
}

export default Room;
