import 'package:flutter/material.dart';
import 'package:dating_app/helpers/app_localizations.dart';

class PwaInstallBanner extends StatefulWidget {
  final VoidCallback onInstall;

  const PwaInstallBanner({super.key, required this.onInstall});

  @override
  PwaInstallBannerState createState() => PwaInstallBannerState();
}

class PwaInstallBannerState extends State<PwaInstallBanner> {
  bool _isVisible = true;

  @override
  Widget build(BuildContext context) {
    if (!_isVisible) return const SizedBox.shrink();

    final i18n = AppLocalizations.of(context);

    return Container(
      padding: const EdgeInsets.all(16),
      color: Theme.of(context).primaryColor.withAlpha(20),
      child: Row(
        children: [
          Icon(Icons.install_mobile, color: Theme.of(context).primaryColor),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  i18n.translate('install_app_for_better_experience') ?? 'Install app for better experience',
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                Text(i18n.translate('add_to_home_screen_to_use_it_like_a_native_app') ?? 'Add to home screen to use it like a native app'),
              ],
            ),
          ),
          ElevatedButton(
            onPressed: () {
              widget.onInstall();
              setState(() {
                _isVisible = false;
              });
            },
            child: Text(i18n.translate('INSTALL') ?? 'INSTALL'),
          ),
          IconButton(
            icon: const Icon(Icons.close),
            onPressed: () {
              setState(() {
                _isVisible = false;
              });
            },
          )
        ],
      ),
    );
  }
}
