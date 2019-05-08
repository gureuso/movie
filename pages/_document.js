import Document, { Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';
import Cookies from 'universal-cookie';

class MyDocument extends Document {
  static getInitialProps(ctx) {
    const cookies = new Cookies(ctx.req.headers.cookie);
    return {
      cookies
    }
  }

  create_nav() {
    const logged_in = this.props.cookies.get('logged_in') == 'true'
    return (
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb" style={{margin: 0}}>
          <li class="breadcrumb-item"><Link href="/movies"><a>영화</a></Link></li>
          <li class="breadcrumb-item"><Link href="/showtimes"><a>예매</a></Link></li>
          <li class="ml-auto">
            {logged_in ? 
              <Link href="/signout"><a>signout</a></Link> : 
              <div>
                <Link href="/signup"><a>signup</a></Link> / <Link href="/signin"><a>signin</a></Link>
              </div>
            }
          </li>
        </ol>
      </nav>
    )
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" charset="utf-8" />
          <link rel="stylesheet" type="text/css" href="/static/css/style.css" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
          <script src="/static/js/common.js"></script>
        </Head>
        <body>
          {this.create_nav()}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
