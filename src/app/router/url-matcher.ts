export class UrlMatcher {
    constructor(public matcher: RegExp, public names?: string[]) {}

    public matches(url: string): object | undefined {
        const parts = this.matcher?.exec(url);

        if (parts) {
            const result: Record<string, string> = {};
            this.names?.forEach((name, index) => {
                if (name) {
                    result[name] = parts[index];
                }
            });

            return result;
        }

        return undefined;
    }
}

export class UrlMatcherSegments {
    segments: string[] = [];
    names: string[] = [];

    public addSegment(segment: string, names?: string[]): void {
        this.segments.push();
        names && this.names.push(...names);
    }

    public compile(): UrlMatcher {
        return new UrlMatcher(new RegExp(this.segments.join('/')), this.names.find((name) => !!name) ? this.names : undefined);
    }
}

export class UrlMatcherFactory {
    public tokens: Record<string, (segments: UrlMatcherSegments, value: string) => void> = {
        '{greenBaseUrl}'(segments: UrlMatcherSegments) {
            segments.addSegment('(verkaufen|vendre)', ['']);
        },
        '{:}'(segments: UrlMatcherSegments, value: string) {
            segments.addSegment('([^/]+)', [value.substring(1)]);
        },
    };

    public create(value: string): UrlMatcher {
        const segments = new UrlMatcherSegments();
        value.split('/').forEach((item) => {
            if (item.startsWith(':')) {
                this.tokens['{:}'](segments, item);
            }

            if (this.tokens[item]) {
                this.tokens[item](segments, item);
            }

            return item;
        });

        return segments.compile();
    }
}
