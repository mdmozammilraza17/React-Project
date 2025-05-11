function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The India-Specific Quiz!</h2>
      <h3>{numQuestions} questions to challenge your India knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
      <p className="contact-info">
        If any concern, contact admin: Mozammil Raza - 6205914390 -
        mdmozammilraza06@gmail.com
      </p>
    </div>
  );
}

export default StartScreen;
