import { defineConfig } from "vitest/config";

export default defineConfig({
    resolve: {
        tsconfigPaths: true,
    },
    test: {
        dir: "src",
        projects: [
            {
                extends: true,
                test: {
                    name: "unit",
                    dir: "src/services",
                },
            },
            {
                extends: true,
                test: {
                    name: "e2e",
                    dir: "src/controllers",
                    environment: "./prisma/vitest-environment/prisma-test-environment.ts"
                },
            },
        ]
    }
});