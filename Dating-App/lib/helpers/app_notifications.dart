import 'package:flutter/foundation.dart';
import 'package:dating_app/datas/user.dart';
import 'package:dating_app/dialogs/common_dialogs.dart';
import 'package:dating_app/models/user_model.dart';
import 'package:dating_app/screens/profile_likes_screen.dart';
import 'package:dating_app/screens/profile_screen.dart';
import 'package:dating_app/screens/profile_visits_screen.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';

class AppNotifications {
  /// Request browser notification permissions
  Future<void> requestNotificationPermissions() async {
    if (kIsWeb) {
      FirebaseMessaging messaging = FirebaseMessaging.instance;
      NotificationSettings settings = await messaging.requestPermission(
        alert: true,
        announcement: false,
        badge: true,
        carPlay: false,
        criticalAlert: false,
        provisional: false,
        sound: true,
      );

      if (settings.authorizationStatus == AuthorizationStatus.authorized) {
        debugPrint('User granted permission');
      } else if (settings.authorizationStatus == AuthorizationStatus.provisional) {
        debugPrint('User granted provisional permission');
      } else {
        debugPrint('User declined or has not accepted permission');
      }
    }
  }

  /// Handle notification click for push
  /// and database notifications
  Future<void> onNotificationClick(
    BuildContext context, {
    required String nType,
    required String nSenderId,
    required String nMessage,
    // Call Info object
    String? nCallInfo,
  }) async {
    /// Control notification type
    switch (nType) {
      case 'like':

        /// Check user VIP account
        if (UserModel().userIsVip) {
          /// Go direct to user profile
          _goToProfileScreen(context, nSenderId);
        } else {
          /// Go Profile Likes Screen
          Navigator.of(context).push(
            MaterialPageRoute(builder: (context) => const ProfileLikesScreen()),
          );
        }
        break;
      case 'visit':

        /// Check user VIP account
        if (UserModel().userIsVip) {
          /// Go direct to user profile
          _goToProfileScreen(context, nSenderId);
        } else {
          /// Go Profile Visits Screen
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) => const ProfileVisitsScreen(),
            ),
          );
        }
        break;

      case 'alert':

        /// Show dialog info
        Future(() {
          infoDialog(context, message: nMessage);
        });

        break;
    }
  }

  /// Navigate to profile screen
  void _goToProfileScreen(BuildContext context, userSenderId) async {
    /// Get updated user info
    final User user = await UserModel().getUserObject(userSenderId);

    /// Go direct to profile
    Future(
      () => Navigator.of(context).push(
        MaterialPageRoute(builder: (context) => ProfileScreen(user: user)),
      ),
    );
  }
}
