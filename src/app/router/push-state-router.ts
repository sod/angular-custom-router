import {APP_INITIALIZER, Injectable, ModuleWithProviders, NgModule, Type} from '@angular/core';
import {createBrowserHistory, To, Transition, Update} from 'history';
import {BehaviorSubject, of, switchMap} from 'rxjs';
import {TryPushStateDirective} from 'src/app/router/try-push-state-directive';
import {UrlMatcher, UrlMatcherFactory} from 'src/app/router/url-matcher';

@Injectable({providedIn: 'root'})
export class PushStateRouter {
    private urlMatcherFactory = new UrlMatcherFactory();
    private routes = new Set<PushStateRoutes>();
    private history = createBrowserHistory({window: window});
    private listener?: () => void;
    public readonly active$ = new BehaviorSubject<{component: Type<unknown>} | null>(null);
    private null$ = of(null);
    private update$ = new BehaviorSubject<Update | undefined>(undefined);
    private runtime$ = this.update$.pipe(
        switchMap((update) => {
            if (!update) {
                return this.null$;
            }

            return [];
        }),
    );

    // constructor(private history: PushStateHistory) {}

    public start(): void {
        if (!this.listener) {
            console.log('start');
            const runtime = this.runtime$.subscribe();
            const unlisten = this.history.listen((update) => this.onUpdate(update));
            // const unblock = this.history.block((transition) => this.onTransition(transition));
            this.listener = () => {
                runtime.unsubscribe();
                this.active$.next(null);
                unlisten();
                // unblock();
            };
        }
    }

    public stop(): void {
        this.listener?.();
        this.listener = undefined;
    }

    public addRoutes(routes: PushStateRoutes): void {
        const routesWithMatcher: PushStateRoutes = routes
            .map((route) => {
                let matcher = route.matcher;
                if (!matcher && typeof route.path === 'string') {
                    matcher = this.urlMatcherFactory.create(route.path);
                }

                if (!matcher) {
                    console.error(`UrlMatcher missing in ${route}`);
                    return;
                }

                return {
                    ...route,
                    matcher,
                };
            })
            .filter(Boolean);

        this.routes.add(routesWithMatcher);
    }

    public onUpdate(update: Update): void {
        console.log('onUpdate', update);
    }

    public onTransition(transition: Transition): void {
        console.log('onTransition', transition);
        transition.retry();
    }

    public push(to: To, state?: object): void {
        this.history.push(to, state);
    }

    private resolve(update: Update): Promise<void> {
        this.routes.forEach((routes) => {
            routes.find((route) => route);
        });
    }
}

export type PushStateRoutes = PushStateRoute[];
export interface PushStateRoute {
    matcher?: UrlMatcher;
    path?: string;
    component: Type<unknown>;
}

@NgModule({
    declarations: [TryPushStateDirective],
    exports: [TryPushStateDirective],
})
export class PushStateRouterModule {
    public static forRoot(routes: PushStateRoutes): ModuleWithProviders<PushStateRouterModule> {
        return {
            ngModule: PushStateRouterModule,
            providers: [
                {
                    provide: APP_INITIALIZER,
                    useFactory: (router: PushStateRouter) => {
                        return () => {
                            router.addRoutes(routes);
                            router.start();
                        };
                    },
                    deps: [PushStateRouter],
                    multi: true,
                },
            ],
        };
    }
}
