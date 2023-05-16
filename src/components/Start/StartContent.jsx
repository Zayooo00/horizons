import { Link } from 'react-router-dom';

import start_bg from '../../assets/images/start_bg.jpg';
import '../../theme/css/Start.css';

export default function StartContent() {
  return (
    <div className="flex-mh-box">
      <div
        className="img-section overlay-dark-bg-1"
        style={{
          backgroundImage: `url(${start_bg})`,
        }}
      />
      <div className="img-section-cover"></div>
      <div className="flex-mh-inner dark-bg-1">
        <div className="container p-tb flex-container responsive">
          <div className="six-columns six-offset">
            <div className="ml-40">
              <h2 className="large-title-bold">
                <span className="line1">Welcome to</span>
                <div className="text-line1-cover"></div>
                <br />
                <span className="line2">Horizons</span>
                <br />
                <div className="text-line2-cover"></div>
              </h2>
              <p className="p-style-bold-up th-20 d-flex-wrap">
                <span className="line3">Your image generating adventure</span>
                <div className="text-line3-cover"></div>
              </p>
              <div className="mt-30">
                <div className="border-btn-box border-btn-red pointer-large">
                  <div className="border-btn-inner">
                    <Link to="/login">
                      <button className="border-btn" data-text="Try now">
                        Try now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
