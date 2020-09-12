import styled,
{
  css
} from 'styled-components';

export const HamContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;

  .menu-btn__burger {
    width: 20px;
    height: 3px;
    background: #fff;
    border-radius: 1px;
    margin: -10px;
    padding: 0;
    box-shadow: 0 2px rgba(255, 101, 47, 0.2);
    transition: all 0.5s ease-in-out;
  }

  .menu-btn__burger::before,
  .menu-btn__burger::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 3px;
    background: #fff;
    border-radius: 1px;
    box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2);
    transition: all 0.5s ease-in-out;
  }

  .menu-btn__burger::before {
    transform: translateY(-8px);
  }

  .menu-btn__burger::after {
    transform: translateY(8px);
    width: 20px;
  }

  .open {
  }

  ${(props) =>
    props &&
    props.isOpen &&
    css`
      .open {
        transform: translateX(-50px);
        background: transparent;
        box-shadow: none;
      }
      .menu-btn__burger::before {
        transform: rotate(45deg) translate(35px, -35px);
      }
      .menu-btn__burger::after {
        transform: rotate(-45deg) translate(35px, 35px);
        width: 30px;
      }
    `}
`;
