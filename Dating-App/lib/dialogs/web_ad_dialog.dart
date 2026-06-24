import 'package:flutter/material.dart';
import 'package:dating_app/helpers/app_localizations.dart';
import 'package:flutter_adsense/flutter_adsense.dart';

class WebAdDialog extends StatefulWidget {
  const WebAdDialog({super.key});

  @override
  WebAdDialogState createState() => WebAdDialogState();
}

class WebAdDialogState extends State<WebAdDialog> {
  int _secondsRemaining = 5;
  bool _canClose = false;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted) {
        setState(() {
          if (_secondsRemaining > 1) {
            _secondsRemaining--;
            _startTimer();
          } else {
            _canClose = true;
          }
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final i18n = AppLocalizations.of(context);

    return Dialog.fullscreen(
      backgroundColor: Colors.black.withAlpha(200),
      child: Stack(
        children: [
          Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 320,
                  height: 480,
                  color: Colors.white,
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          i18n.translate('advertisement') ?? 'Advertisement',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                        ),
                        const SizedBox(height: 8),
                        // Use AdsenseWidget for PWA ads
                        const AdsenseWidget(
                          adClient: 'ca-pub-XXXXXXXXXXXXXXXX',
                          adSlot: '1234567890',
                          width: 300,
                          height: 250,
                          adFormat: 'rectangle',
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
          Positioned(
            top: 40,
            right: 20,
            child: _canClose
                ? IconButton(
                    icon: const Icon(Icons.close, color: Colors.white, size: 30),
                    onPressed: () => Navigator.of(context).pop(),
                  )
                : Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.black.withAlpha(150),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      '$_secondsRemaining',
                      style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                    ),
                  ),
          ),
        ],
      ),
    );
  }
}
