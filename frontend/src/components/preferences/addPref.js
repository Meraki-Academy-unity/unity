
  return (
    <div className="regCont">
      <div className="leftAuthReg">
        <div className="imgDiv">
          <img src={img} alt="" />
        </div>
      </div>
      <div className="rightAuthReg">
        <div className="regWrapper">
          <h1>Preferences</h1>
          <div className="regForm">
            {/* _____________________________________________ */}
            <div className="firstName">
              <label>desired travel location : </label>
              <PerferencesLocation setPrefenecesLocation={setPrefenecesLocation} />
                {prefenecesLocation}
        <div>
            <div className="email">
              <label>availability to travel:</label>
              <input
                onChange={(e) => {
                  setLanguage(e.target.value);
                }}
                type="text"
                placeholder="Enter The Languages That you speak Here"
              />
            </div>
            <div className="firstName">
              <label>Display Name:</label>
              <input
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
                type="text"
                placeholder="Enter Display Name Here"
              />
            </div>
            <div className="lastName">
              <label> Date Of Birth :</label>
              <input
                onChange={(e) => {
                  setDateOfBirth(e.target.value);
                }}
                type="date"
                placeholder="mm-dd-yyyy"
                min="1900-01-01"
                max="2003-12-31"
              />
            </div>
            <div className="firstName">
              <label>Gender:</label>
              <form>
                <div>
                  <input
                    onChange={() => {
                      setGender("Male");
                    }}
                    name="Gender"
                    id="Male"
                    type="radio"
                    value="Male"
                  />
                  <label htmlFor="Male">Male</label>
                </div>
                <div>
                  <input
                    onChange={() => {
                      setGender("Female");
                    }}
                    name="Gender"
                    id="Female"
                    type="radio"
                    value="Female"
                  />
                  <label htmlFor="Female">Female</label>
                </div>
              </form>
            </div>

            <div className="lastName">
              <label>Upload Image:</label>
              {file && <LoaderBar file={file} setFile={setFile} />}
              <input type="file" onChange={uploadImage} />
              {/* {file && <h1>{file.name}</h1>} */}
              {errorImgMessage && <div>{errorImgMessage}</div>}
            </div>
            <div className="createAccount">
              <button onClick={signUpSecondStep}>Next</button>
              <small>
                <Link to="/preferences">skip</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

return (
    <>
      <div className="Perferences">
        <label>desired travel location : </label>
        <PerferencesLocation setPrefenecesLocation={setPrefenecesLocation} />
        {prefenecesLocation}
        <div>
          <p>availability to travel</p>
          <label>Start Date : </label>
          <input
            type="date"
            min={minStartDate}
            max={maxStartDate}
            onChange={(e) => setStart_date(e.target.value)}
          />

          <label>Finish Date : </label>
          <input
            type="date"
            min={minFinishtDate}
            max={maxFinishDate}
            onChange={(e) => setFinish_date(e.target.value)}
          />
          <label>Activities : </label>
        </div>

        <textarea
          onChange={(e) => setActivities(e.target.value)}
          placeholder=" activities here"
        ></textarea>

        <form action="/action_page.php">
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="1"
            onChange={() => {
              setSame_gender(1);
            }}
          />
          <label for="vehicle1"> same gender</label>
        </form>

        <form action="/action_page.php">
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value="1"
            onChange={() => {
              setSimilar_age(1);
            }}
          />
          <label for="vehicle1"> same Age</label>
        </form>

        <button onClick={addNewPerferences}>create Perferences</button>
        <Link to="/login">Skip</Link>
      </div>
    </>
  );
};