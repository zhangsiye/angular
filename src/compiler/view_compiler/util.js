'use strict';"use strict";
var lang_1 = require('angular2/src/facade/lang');
var o = require('../output/output_ast');
function getPropertyInView(property, viewPath) {
    if (viewPath.length === 0) {
        return property;
    }
    else {
        var viewProp = o.THIS_EXPR;
        for (var i = 0; i < viewPath.length; i++) {
            viewProp = viewProp.prop('declarationAppElement').prop('parentView');
        }
        if (property instanceof o.ReadPropExpr) {
            var lastView = viewPath[viewPath.length - 1];
            var readPropExpr_1 = property;
            // Note: Don't cast for members of the AppView base class...
            if (lastView.fields.some(function (field) { return field.name == readPropExpr_1.name; }) ||
                lastView.getters.some(function (field) { return field.name == readPropExpr_1.name; })) {
                viewProp = viewProp.cast(lastView.classType);
            }
        }
        return o.replaceVarInExpression(o.THIS_EXPR.name, viewProp, property);
    }
}
exports.getPropertyInView = getPropertyInView;
function injectFromViewParentInjector(token, optional) {
    var method = optional ? 'getOptional' : 'get';
    return o.THIS_EXPR.prop('parentInjector').callMethod(method, [createDiTokenExpression(token)]);
}
exports.injectFromViewParentInjector = injectFromViewParentInjector;
function getViewFactoryName(component, embeddedTemplateIndex) {
    return "viewFactory_" + component.type.name + embeddedTemplateIndex;
}
exports.getViewFactoryName = getViewFactoryName;
function createDiTokenExpression(token) {
    if (lang_1.isPresent(token.value)) {
        return o.literal(token.value);
    }
    else if (token.identifierIsInstance) {
        return o.importExpr(token.identifier)
            .instantiate([], o.importType(token.identifier, [], [o.TypeModifier.Const]));
    }
    else {
        return o.importExpr(token.identifier);
    }
}
exports.createDiTokenExpression = createDiTokenExpression;
function createFlatArray(expressions) {
    var lastNonArrayExpressions = [];
    var result = o.literalArr([]);
    for (var i = 0; i < expressions.length; i++) {
        var expr = expressions[i];
        if (expr.type instanceof o.ArrayType) {
            if (lastNonArrayExpressions.length > 0) {
                result =
                    result.callMethod(o.BuiltinMethod.ConcatArray, [o.literalArr(lastNonArrayExpressions)]);
                lastNonArrayExpressions = [];
            }
            result = result.callMethod(o.BuiltinMethod.ConcatArray, [expr]);
        }
        else {
            lastNonArrayExpressions.push(expr);
        }
    }
    if (lastNonArrayExpressions.length > 0) {
        result =
            result.callMethod(o.BuiltinMethod.ConcatArray, [o.literalArr(lastNonArrayExpressions)]);
    }
    return result;
}
exports.createFlatArray = createFlatArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtTVFyMTRpUmMudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFCQUFpQywwQkFBMEIsQ0FBQyxDQUFBO0FBRTVELElBQVksQ0FBQyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFRMUMsMkJBQWtDLFFBQXNCLEVBQUUsUUFBdUI7SUFDL0UsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sSUFBSSxRQUFRLEdBQWlCLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDekMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDekMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdkUsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3QyxJQUFJLGNBQVksR0FBbUIsUUFBUSxDQUFDO1lBQzVDLDREQUE0RDtZQUM1RCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUssQ0FBQyxJQUFJLElBQUksY0FBWSxDQUFDLElBQUksRUFBL0Is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Qy9CLENBQUM7WUFDRCxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLENBQUM7SUFDSCxDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsdUJBQXVCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsTUFBTTtZQUNGLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFyQmUsdUJBQWUsa0JBcUI5QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtcbiAgQ29tcGlsZVRva2VuTWV0YWRhdGEsXG4gIENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSxcbiAgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YVxufSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcbmltcG9ydCB7Q29tcGlsZVZpZXd9IGZyb20gJy4vY29tcGlsZV92aWV3JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3BlcnR5SW5WaWV3KHByb3BlcnR5OiBvLkV4cHJlc3Npb24sIHZpZXdQYXRoOiBDb21waWxlVmlld1tdKTogby5FeHByZXNzaW9uIHtcbiAgaWYgKHZpZXdQYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdmlld1Byb3A6IG8uRXhwcmVzc2lvbiA9IG8uVEhJU19FWFBSO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlld1BhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZpZXdQcm9wID0gdmlld1Byb3AucHJvcCgnZGVjbGFyYXRpb25BcHBFbGVtZW50JykucHJvcCgncGFyZW50VmlldycpO1xuICAgIH1cbiAgICBpZiAocHJvcGVydHkgaW5zdGFuY2VvZiBvLlJlYWRQcm9wRXhwcikge1xuICAgICAgdmFyIGxhc3RWaWV3ID0gdmlld1BhdGhbdmlld1BhdGgubGVuZ3RoIC0gMV07XG4gICAgICBsZXQgcmVhZFByb3BFeHByOiBvLlJlYWRQcm9wRXhwciA9IHByb3BlcnR5O1xuICAgICAgLy8gTm90ZTogRG9uJ3QgY2FzdCBmb3IgbWVtYmVycyBvZiB0aGUgQXBwVmlldyBiYXNlIGNsYXNzLi4uXG4gICAgICBpZiAobGFzdFZpZXcuZmllbGRzLnNvbWUoKGZpZWxkKSA9PiBmaWVsZC5uYW1lID09IHJlYWRQcm9wRXhwci5uYW1lKSB8fFxuICAgICAgICAgIGxhc3RWaWV3LmdldHRlcnMuc29tZSgoZmllbGQpID0+IGZpZWxkLm5hbWUgPT0gcmVhZFByb3BFeHByLm5hbWUpKSB7XG4gICAgICAgIHZpZXdQcm9wID0gdmlld1Byb3AuY2FzdChsYXN0Vmlldy5jbGFzc1R5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gby5yZXBsYWNlVmFySW5FeHByZXNzaW9uKG8uVEhJU19FWFBSLm5hbWUsIHZpZXdQcm9wLCBwcm9wZXJ0eSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluamVjdEZyb21WaWV3UGFyZW50SW5qZWN0b3IodG9rZW46IENvbXBpbGVUb2tlbk1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWw6IGJvb2xlYW4pOiBvLkV4cHJlc3Npb24ge1xuICB2YXIgbWV0aG9kID0gb3B0aW9uYWwgPyAnZ2V0T3B0aW9uYWwnIDogJ2dldCc7XG4gIHJldHVybiBvLlRISVNfRVhQUi5wcm9wKCdwYXJlbnRJbmplY3RvcicpLmNhbGxNZXRob2QobWV0aG9kLCBbY3JlYXRlRGlUb2tlbkV4cHJlc3Npb24odG9rZW4pXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWaWV3RmFjdG9yeU5hbWUoY29tcG9uZW50OiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYmVkZGVkVGVtcGxhdGVJbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIGB2aWV3RmFjdG9yeV8ke2NvbXBvbmVudC50eXBlLm5hbWV9JHtlbWJlZGRlZFRlbXBsYXRlSW5kZXh9YDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGlUb2tlbkV4cHJlc3Npb24odG9rZW46IENvbXBpbGVUb2tlbk1ldGFkYXRhKTogby5FeHByZXNzaW9uIHtcbiAgaWYgKGlzUHJlc2VudCh0b2tlbi52YWx1ZSkpIHtcbiAgICByZXR1cm4gby5saXRlcmFsKHRva2VuLnZhbHVlKTtcbiAgfSBlbHNlIGlmICh0b2tlbi5pZGVudGlmaWVySXNJbnN0YW5jZSkge1xuICAgIHJldHVybiBvLmltcG9ydEV4cHIodG9rZW4uaWRlbnRpZmllcilcbiAgICAgICAgLmluc3RhbnRpYXRlKFtdLCBvLmltcG9ydFR5cGUodG9rZW4uaWRlbnRpZmllciwgW10sIFtvLlR5cGVNb2RpZmllci5Db25zdF0pKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gby5pbXBvcnRFeHByKHRva2VuLmlkZW50aWZpZXIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGbGF0QXJyYXkoZXhwcmVzc2lvbnM6IG8uRXhwcmVzc2lvbltdKTogby5FeHByZXNzaW9uIHtcbiAgdmFyIGxhc3ROb25BcnJheUV4cHJlc3Npb25zID0gW107XG4gIHZhciByZXN1bHQ6IG8uRXhwcmVzc2lvbiA9IG8ubGl0ZXJhbEFycihbXSk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwcmVzc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZXhwciA9IGV4cHJlc3Npb25zW2ldO1xuICAgIGlmIChleHByLnR5cGUgaW5zdGFuY2VvZiBvLkFycmF5VHlwZSkge1xuICAgICAgaWYgKGxhc3ROb25BcnJheUV4cHJlc3Npb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmVzdWx0ID1cbiAgICAgICAgICAgIHJlc3VsdC5jYWxsTWV0aG9kKG8uQnVpbHRpbk1ldGhvZC5Db25jYXRBcnJheSwgW28ubGl0ZXJhbEFycihsYXN0Tm9uQXJyYXlFeHByZXNzaW9ucyldKTtcbiAgICAgICAgbGFzdE5vbkFycmF5RXhwcmVzc2lvbnMgPSBbXTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5jYWxsTWV0aG9kKG8uQnVpbHRpbk1ldGhvZC5Db25jYXRBcnJheSwgW2V4cHJdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGFzdE5vbkFycmF5RXhwcmVzc2lvbnMucHVzaChleHByKTtcbiAgICB9XG4gIH1cbiAgaWYgKGxhc3ROb25BcnJheUV4cHJlc3Npb25zLmxlbmd0aCA+IDApIHtcbiAgICByZXN1bHQgPVxuICAgICAgICByZXN1bHQuY2FsbE1ldGhvZChvLkJ1aWx0aW5NZXRob2QuQ29uY2F0QXJyYXksIFtvLmxpdGVyYWxBcnIobGFzdE5vbkFycmF5RXhwcmVzc2lvbnMpXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdfQ==