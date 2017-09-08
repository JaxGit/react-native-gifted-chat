import PropTypes from 'prop-types';
import React from "react";
import {Image, StyleSheet, View, ViewPropTypes} from "react-native";
import GiftedAvatar from "./GiftedAvatar";
import {isSameUser, isSameDay, warnDeprecated} from "./utils";

export default class Avatar extends React.Component {
  renderAvatar(isVisible) {
    if (this.props.renderAvatar) {
      const {renderAvatar, ...avatarProps} = this.props;
      return this.props.renderAvatar(avatarProps);
    }
    return (
      <GiftedAvatar
        avatarStyle={StyleSheet.flatten([styles[this.props.position].image, this.props.imageStyle[this.props.position]])}
        user={isVisible ? this.props.currentMessage.user : undefined}
        onPress={() => this.props.onPressAvatar && this.props.onPressAvatar(this.props.currentMessage.user)}
      />
    );
  }

  render() {
    const renderAvatarOnTop = this.props.renderAvatarOnTop;
    const messageToCompare = renderAvatarOnTop ? this.props.previousMessage : this.props.nextMessage;
    const computedStyle = renderAvatarOnTop ? "onTop" : "onBottom"

    if (this.props.renderAvatar === null) {
      return null
    }

    let isVisible = true;
    if (isSameUser(this.props.currentMessage, messageToCompare) && isSameDay(this.props.currentMessage, messageToCompare)) {
      isVisible = this.props.renderAvatarsForSameUser;
    }

    return (
      <View
        style={[styles[this.props.position].container, styles[this.props.position][computedStyle], this.props.containerStyle[this.props.position]]}>
        {this.renderAvatar(isVisible)}
      </View>
    );
  }
}

const styles = {
  left: StyleSheet.create({
    container: {
      marginRight: 8
    },
    onTop: {
      alignSelf: "flex-start"
    },
    onBottom: {},
    image: {
      height: 36,
      width: 36,
      borderRadius: 18,
    },
  }),
  right: StyleSheet.create({
    container: {
      marginLeft: 8,
    },
    onTop: {
      alignSelf: "flex-start"
    },
    onBottom: {},
    image: {
      height: 36,
      width: 36,
      borderRadius: 18,
    },
  }),
};

Avatar.defaultProps = {
  renderAvatarsForSameUser: false,
  renderAvatarOnTop: false,
  position: 'left',
  currentMessage: {
    user: null,
  },
  nextMessage: {},
  containerStyle: {},
  imageStyle: {},
  //TODO: remove in next major release
  isSameDay: warnDeprecated(isSameDay),
  isSameUser: warnDeprecated(isSameUser)
};

Avatar.propTypes = {
  renderAvatarsForSameUser: PropTypes.bool,
  renderAvatarOnTop: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  onPressAvatar: PropTypes.func,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  imageStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  //TODO: remove in next major release
  isSameDay: PropTypes.func,
  isSameUser: PropTypes.func
};
