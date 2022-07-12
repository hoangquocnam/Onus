import '../../styles/components/spinner.css';

function Spinner(props) {
  return (
    <div className="spinner">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          margin: "auto",
          background: "0 0",
          display: "block",
          shapeRendering: "auto",
        }}
        width={100}
        height={100}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        {...props}
      >
        <rect x={44} y={17} rx={6} ry={6} width={12} height={12} fill="#38262a">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.9s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={44}
          y={17}
          rx={6}
          ry={6}
          width={12}
          height={12}
          fill="#38262a"
          transform="rotate(36 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.8s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={44}
          y={17}
          rx={6}
          ry={6}
          width={12}
          height={12}
          fill="#38262a"
          transform="rotate(72 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.7s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={44}
          y={17}
          rx={6}
          ry={6}
          width={12}
          height={12}
          fill="#38262a"
          transform="rotate(108 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.6s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={44}
          y={17}
          rx={6}
          ry={6}
          width={12}
          height={12}
          fill="#38262a"
          transform="rotate(144 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.5s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={44}
          y={17}
          rx={6}
          ry={6}
          width={12}
          height={12}
          fill="#38262a"
          transform="rotate(180 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.4s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={44}
          y={17}
          rx={6}
          ry={6}
          width={12}
          height={12}
          fill="#38262a"
          transform="rotate(216 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.3s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={44}
          y={17}
          rx={6}
          ry={6}
          width={12}
          height={12}
          fill="#38262a"
          transform="rotate(252 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.2s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={44}
          y={17}
          rx={6}
          ry={6}
          width={12}
          height={12}
          fill="#38262a"
          transform="rotate(288 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="-0.1s"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x={44}
          y={17}
          rx={6}
          ry={6}
          width={12}
          height={12}
          fill="#38262a"
          transform="rotate(324 50 50)"
        >
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
}

export default Spinner;
