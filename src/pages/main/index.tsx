import './main-styles.scss';

export function MainPage() {
  //Main GraphiQL Page
  return(
    <main>
      <section className="main-top">
        <div className="endpoint">
          <input
              id="endpoint-input"
              className="input endpoint-input"
              type="text"
              placeholder='type the endpoint'
            />
            <button type="button" className="btn endpoint-btn" >
              Set endpoint
            </button>
          </div>
          <div className="documentation-btn">Doc explorer</div>
      </section>
      <section className="main-content">
      <aside className="actions">actions</aside>
      <section className="graphGL">
      <div className="graphGL-request">request</div>
      <div className="graphGL-result">responce</div>
      <div className="graphGL-vars"></div>
      <div className="graphGL-json"></div>
      </section>
      <div className="documentation-content">Doc content</div>
      </section>
    </main>
  );
}
