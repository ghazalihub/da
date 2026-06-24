import 'package:dating_app/helpers/app_localizations.dart';
import 'package:dating_app/models/app_model.dart';
import 'package:dating_app/models/user_model.dart';
import 'package:dating_app/widgets/my_circular_progress.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:in_app_purchase/in_app_purchase.dart';
import 'package:scoped_model/scoped_model.dart';
import 'package:url_launcher/url_launcher.dart';

class StoreProducts extends StatefulWidget {
  final Widget icon;
  final Color priceColor;

  const StoreProducts({super.key, required this.icon, required this.priceColor});

  @override
  StoreProductsState createState() => StoreProductsState();
}

class StoreProductsState extends State<StoreProducts> {
  // Variables
  bool _storeIsAvailable = false;
  List<ProductDetails>? _products;
  late AppLocalizations _i18n;

  @override
  void initState() {
    super.initState();

    if (kIsWeb) {
      _storeIsAvailable = true;
      // Mocking products for web as an example.
      // In a real app, you would fetch these from your backend or a config file.
      _products = [
        ProductDetails(
          id: 'vip_1_month',
          title: 'VIP 1 Month',
          description: 'Unlock all features for 1 month',
          price: '\$9.99',
          rawPrice: 9.99,
          currencyCode: 'USD',
        ),
        ProductDetails(
          id: 'vip_6_months',
          title: 'VIP 6 Months',
          description: 'Unlock all features for 6 months',
          price: '\$49.99',
          rawPrice: 49.99,
          currencyCode: 'USD',
        ),
        ProductDetails(
          id: 'vip_1_year',
          title: 'VIP 1 Year',
          description: 'Unlock all features for 1 year',
          price: '\$89.99',
          rawPrice: 89.99,
          currencyCode: 'USD',
        ),
      ];
    } else {
      // Check google play services
      InAppPurchase.instance.isAvailable().then((result) {
        if (mounted) {
          setState(() {
            _storeIsAvailable =
                result; // if false the store can not be reached or accessed
          });
        }
      });

      // Get product subscriptions from google play store / apple store
      InAppPurchase.instance
          .queryProductDetails(AppModel().appInfo.subscriptionIds.toSet())
          .then((ProductDetailsResponse response) {
        /// Update UI
        if (mounted) {
          setState(() {
            // Get product list
            _products = response.productDetails;
            // Check result
            if (_products!.isNotEmpty) {
              // Order price by ASC
              _products!.sort((a, b) {
                // Get int prices to be ordered
                final priceA =
                    int.parse(a.price.replaceAll(RegExp(r'[^0-9]'), ''));
                final priceB =
                    int.parse(b.price.replaceAll(RegExp(r'[^0-9]'), ''));
                // ASC order
                return priceA.compareTo(priceB);
              });
            }
          });
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    // Init
    _i18n = AppLocalizations.of(context);

    return _storeIsAvailable ? _showProducts() : _storeNotAvailable();
  }

  Widget _showProducts() {
    if (_products == null) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const MyCircularProgress(),
              const SizedBox(height: 5),
              Text(_i18n.translate("processing"),
                  style: const TextStyle(fontSize: 18),
                  textAlign: TextAlign.center),
              Text(_i18n.translate("please_wait"),
                  style: const TextStyle(fontSize: 18),
                  textAlign: TextAlign.center)
            ],
          ),
        ),
      );
    } else if (_products!.isNotEmpty) {
      // Show Subscriptions
      return ScopedModelDescendant<UserModel>(
          builder: (context, child, userModel) {
        return Column(
            children: _products!.map<Widget>((item) {
          return Card(
            margin: const EdgeInsets.only(bottom: 10),
            child: ListTile(
              enabled: userModel.activeVipId == item.id ? false : true,
              leading: widget.icon,
              title: Text(
                  // Android only - remove the app name from title
                  item.title.replaceAll(
                      RegExp(r"\([^]*\)", caseSensitive: false), ''),
                  style: const TextStyle(
                      fontSize: 18, fontWeight: FontWeight.bold)),
              subtitle: Text(item.price,
                  style: TextStyle(
                      fontSize: 19,
                      color: widget.priceColor,
                      fontWeight: FontWeight.bold)),
              trailing: ElevatedButton(
                  onPressed: userModel.activeVipId == item.id
                      ? null
                      : () async {
                          if (kIsWeb) {
                            // On web, redirect to a external payment page (Stripe, PayPal, etc.)
                            // Example:
                            final Uri url = Uri.parse('https://your-payment-gateway.com/pay?plan=${item.id}&userId=${userModel.user.userId}');
                            if (await canLaunchUrl(url)) {
                              await launchUrl(url);
                            } else {
                              debugPrint('Could not launch payment url');
                            }
                          } else {
                            // Purchase parameters
                            final pParam = PurchaseParam(
                              productDetails: item,
                            );

                            /// Subscribe
                            InAppPurchase.instance
                                .buyNonConsumable(purchaseParam: pParam);
                          }
                        },
                  child: userModel.activeVipId == item.id
                      ? Text(_i18n.translate("ACTIVE"),
                          style: const TextStyle(color: Colors.white))
                      : Text(_i18n.translate("SUBSCRIBE"),
                          style: const TextStyle(color: Colors.white))),
            ),
          );
        }).toList());
      });
    } else {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Icon(Icons.search,
                  size: 80, color: Theme.of(context).primaryColor),
              Text(_i18n.translate("no_products_or_subscriptions"),
                  style: const TextStyle(fontSize: 18),
                  textAlign: TextAlign.center),
            ],
          ),
        ),
      );
    }
  }

  Widget _storeNotAvailable() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Icon(Icons.error_outline,
              size: 80, color: Theme.of(context).primaryColor),
          Text(_i18n.translate("oops_an_error_has_occurred"),
              style: const TextStyle(fontSize: 18.0),
              textAlign: TextAlign.center),
        ],
      ),
    );
  }
}
