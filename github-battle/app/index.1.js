var USER_DATA = {
    name: 'Teodor Bardici',
    username: 'teo-mateo',
    image: 'https://avatars2.githubusercontent.com/u/2630163?v=3&s=466'
};

var React = require('react');
var ReactDOM = require('react-dom');

/* All React components must be:
Focused
Independent
Reusable
Small
Testable
*/

var ProfilePic = React.createClass({
    render: function(){
        return <img src={this.props.imageUrl} style={{height: 100, width: 100}} />
    }
});

var Link = React.createClass({
    changeUrl: function(){
        window.location.replace(this.props.href)
    },
    render: function(){
        return (
            <span
                style={{color:'blue', cursor:'pointer'}}
                onClick={this.changeUrl}>
             {this.props.children}
            </span>
        )
    }
})

var ProfilePicLink = React.createClass({
    render: function(){
        return (<div>
        <Link href={'https://github.com/' + this.props.username}>
            {this.props.username}
        </Link>
        </div>);
    }
});

var ProfileName = React.createClass({
    render: function(){
        return (<div> {this.props.name} </div>);
    }
});

var Avatar = React.createClass({
    render: function(){
        return (<div>
            <ProfilePic imageUrl={this.props.user.image} />
            <ProfileName name={this.props.user.name} />
            <ProfilePicLink username={this.props.user.username} />
        </div>);
    }
});

ReactDOM.render(
    <Avatar user={USER_DATA} />,
    document.getElementById('app')
);