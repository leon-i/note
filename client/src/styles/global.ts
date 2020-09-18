import { createGlobalStyle } from 'styled-components'
import { theme } from "./theme";
const { colors } = theme;
const {
    baseDark,
    darkLayer1,
    darkLayer2,
    darkLayer3,
    darkLayer4,
    white
} = colors;

export const GlobalStyle = createGlobalStyle`
#root, .ant-layout {
    height: 100%;
}

.splash {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.ant-layout {
    background: ${baseDark};
}

.ant-layout-header {
    padding-left: 32px;
    background: ${darkLayer1};
}

.ant-modal-content {
    background-color: ${darkLayer2}};
}

.ant-modal-footer {
    border-top: 1px solid #000000;
}

label, .ant-input-suffix span {
    color: ${white};
}

.ant-modal-close-x {
    color: ${white};
    opacity: 0.8;

    &:hover {
        opacity: 1;
    }
}

input, .ant-input-affix-wrapper, textarea {
    background-color: ${darkLayer3};
    color: #fff;
}

.ant-card-bordered {
    background: ${darkLayer2};
    border-color: ${darkLayer3};

    .ant-card-head {
        border-color: ${darkLayer4};

        a {
            font-size: 1.2em;
            color: ${white};

            &:hover {
                color: #1890ff;
            }
        }
    }

    .ant-card-actions {
        background: ${darkLayer2};
        border-color: ${darkLayer4};

        a {
            color: ${white};

            &:hover {
                color: #1890ff;
            }
        }
    }

    p {
        color: ${white};
    }
}

.ant-breadcrumb-link a {
    color: ${white};

    &:hover {
        color: #40a9ff;
    }
}

.ant-breadcrumb-separator {
    color:${white};
}

.ant-layout-sider {
    background: ${darkLayer1};

    .ant-menu {
        background: ${darkLayer1};

        .ant-menu-item {
            font-size: 1.1em;
            color: ${white};

            &:hover {
                color: #1890ff;
            }
        }
    }
}

h1 {
    color: ${white};
}
`;