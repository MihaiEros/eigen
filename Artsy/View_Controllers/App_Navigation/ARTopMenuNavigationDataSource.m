#import "ARTopMenuNavigationDataSource.h"

#import <Emission/AREmission.h>
#import <Emission/ARInboxComponentViewController.h>
#import <Emission/ARMyProfileComponentViewController.h>
#import <Emission/ARMapContainerViewController.h>
#import <Emission/ARSearchComponentViewController.h>
#import <Emission/ARSalesComponentViewController.h>

#import "AREigenMapContainerViewController.h"
#import "UIDevice-Hardware.h"
#import "FeaturedLink.h"
#import "ARNavigationController.h"
#import "AROptions.h"
#import "ARDefaults.h"
#import "ArtsyEcho.h"
#import "ARTabType.h"

#import <SDWebImage/SDWebImagePrefetcher.h>
#import <ObjectiveSugar/ObjectiveSugar.h>

@interface TabData : NSObject
@property (strong, nonatomic, readonly) NSString *tabType;
@property (strong, nonatomic) ARNavigationController *cachedNavigationController;
@property (strong, nonatomic) ARComponentViewController* (^construct)(void);

- (ARNavigationController *)navigationController;
- (instancetype) initWithConstructor:(ARComponentViewController* (^)(void))construct tabType:(NSString *)tabType;

@end

@implementation TabData

-(instancetype)initWithConstructor:(ARComponentViewController *(^)(void))construct tabType:(NSString *)tabType
{
    self = [self init];
    if (self) {
        _tabType = tabType;
        _construct = construct;
    }
    return self;
}
- (ARNavigationController *)navigationController
{
    if (self.cachedNavigationController) {
        return self.cachedNavigationController;
    }
    ARComponentViewController *vc = self.construct();
    vc.tabRootName = self.tabType;
    self.cachedNavigationController = [[ARNavigationController alloc] initWithRootViewController:vc];
    return self.cachedNavigationController;
}

@end

@interface ARTopMenuNavigationDataSource ()
@property (strong, nonatomic, readonly) NSDictionary<NSString*, TabData*> *config;
@end

@implementation ARTopMenuNavigationDataSource

- init {
    self = [super init];
    if (self) {
        _config = @{
            [ARTabType home]:
                [[TabData alloc] initWithConstructor:^() { return [ARComponentViewController module:@"Home" withProps:@{}]; }
                                             tabType:[ARTabType home]],
            [ARTabType sell]:
                [[TabData alloc] initWithConstructor:^() { return [[ARSalesComponentViewController alloc] init]; }
                                             tabType:[ARTabType sell]],
            [ARTabType search]:
                [[TabData alloc] initWithConstructor:^() { return [[ARSearchComponentViewController alloc] init]; }
                                             tabType:[ARTabType search]],
            [ARTabType inbox]:
                [[TabData alloc] initWithConstructor:^() { return [[ARInboxComponentViewController alloc] initWithInbox]; }
                                             tabType:[ARTabType inbox]],
            [ARTabType profile]:
                [[TabData alloc] initWithConstructor:^() { return [[ARMyProfileComponentViewController alloc] init]; }
                                             tabType:[ARTabType profile]],
        };
    }
    return self;
}

- (ARNavigationController *)navigationControllerForTabType:(NSString *)tabType
{
    return [[self.config objectForKey:tabType] navigationController];
}

- (NSArray<NSString *> *)registeredTabTypes
{
    return self.config.allKeys;
}

@end
